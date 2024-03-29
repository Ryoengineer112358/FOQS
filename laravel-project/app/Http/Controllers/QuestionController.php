<?php

namespace App\Http\Controllers;

use App\Models\StudentComment;
use App\Models\StudentQuestion;
use App\Models\TutorAnswer;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $studentAuth = \Auth::guard('students')->check();
        $tutorAuth = \Auth::guard('tutors')->check();

        if (!$studentAuth && !$tutorAuth) {
            return [];
        }
        if ($studentAuth) {
            $query = StudentQuestion::where('student_id', \Auth::id());
        } else {
            $query = StudentQuestion::where('tutor_id', \Auth::id());
        }

        if ($request->closed_only) {
            $query = $query->whereNotNull('closed_at');
        } else {
            $query = $query->whereNull('closed_at')->with([
                'tutor_answers' => function ($query) {
                    $query->orderBy('created_at', 'desc');
                },
                'student_comments' => function ($query) {
                    $query->orderBy('created_at', 'desc');
                },
            ]);
        }

        $questions = $query->orderByDesc('updated_at')->get();

        return $questions;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        \DB::beginTransaction();
        try {
            $question = StudentQuestion::create([
                'student_id' => \Auth::id(),
                'tutor_id' => $request->tutor_id,
                'text' => $request->text,
            ]);

            if ($request->hasfile('images')) {
                foreach ($request->file('images') as $image) {
                    // 画像のパスを取得
                    $originalPath = $image->getPathname();

                    // Imagick インスタンスを初期化
                    $imagick = new \Imagick($originalPath);

                    // 現在のオリエンテーションを取得
                    $orientation = $imagick->getImageOrientation();

                    // 現在のオリエンテーションに基づいて画像を回転
                    switch ($orientation) {
                        case \Imagick::ORIENTATION_BOTTOMRIGHT:
                            $imagick->rotateimage('#000', 180); // 180度回転
                            break;

                        case \Imagick::ORIENTATION_RIGHTTOP:
                            $imagick->rotateimage('#000', 90); // 90度時計回り回転
                            break;

                        case \Imagick::ORIENTATION_LEFTBOTTOM:
                            $imagick->rotateimage('#000', -90); // 90度反時計回り回転
                            break;
                    }

                    // 自動的に回転した後、EXIF オリエンテーションを1 (通常) に設定
                    $imagick->setImageOrientation(\Imagick::ORIENTATION_TOPLEFT);

                    // GPS情報を含むすべての EXIF データを削除
                    $imagick->stripImage();

                    // 一時ファイルに変更された画像を保存
                    $tempPath = tempnam(sys_get_temp_dir(), 'modified_image');
                    $imagick->writeImage($tempPath);

                    // ストレージに変更された画像を保存し、そのパスを取得
                    $relativePath = \Storage::disk(env('FILESYSTEM_DISK', 'public'))->putFile(
                        'questions',
                        new \Illuminate\Http\File($tempPath)
                    );

                    // 画像テーブルにレコードを作成
                    $question->images()->create([
                        'image_path' => $relativePath,
                    ]);
                }
            }
            \DB::commit();

            return response($question, 201);
        } catch (\Exception $e) {
            \DB::rollback();

            // エラーが発生した場合、保存したファイルを削除
            if (isset($relativePath)) {
                \Storage::disk('public')->delete($relativePath);
            }

            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(StudentQuestion $question)
    {
        $question->load([
            'tutor_answers' => function ($query) use ($question) {
                $query
                    ->where('tutor_id', $question->tutor_id)
                    ->orderBy('created_at', 'asc');
            },
            'student_comments' => function ($query) use ($question) {
                $query
                    ->where('tutor_id', $question->tutor_id)
                    ->orderBy('created_at', 'asc');
            },
            'student',
            'images',
        ]);

        $question->image_urls = $question->images->map(function ($image) {
            return $image->image_path;
        });

        return $question;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StudentQuestion $question)
    {
        $tutorAuth = \Auth::guard('tutors')->check();
        if ($tutorAuth) {
            $question->tutor_id = \Auth::id();
            $question->save();
        }
        return response($question, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(StudentQuestion $question)
    {
        $question->delete();
        return response()->json(
            [
                'message' => '質問が正常に削除されました',
            ],
            200
        );
    }

    public function reply(Request $request, StudentQuestion $question)
    {
        if ($request->user()->cannot('view', $question)) {
            abort(403);
        }

        \DB::transaction(function () use ($question, $request) {
            $studentAuth = \Auth::guard('students')->check();
            $tutorAuth = \Auth::guard('tutors')->check();
            $question->touch();

            if ($studentAuth) {
                StudentComment::create([
                    'text' => $request->message,
                    'student_question_id' => $question->id,
                    'tutor_id' => $question->tutor_id,
                ]);
            }

            if ($tutorAuth) {
                TutorAnswer::create([
                    'text' => $request->message,
                    'student_question_id' => $question->id,
                    'tutor_id' => $question->tutor_id,
                ]);
            }
        });
    }

    public function rateTutor(Request $request, StudentQuestion $question)
    {
        $request->validate([
            'rating' => 'required|integer|between:0,5',
        ]);

        $question->update([
            'tutor_rating' => $request->input('rating'),
        ]);

        return response()->json(
            [
                'message' => '評価が正常に保存されました',
            ],
            200
        );
    }

    public function solve(StudentQuestion $question)
    {
        $question->closed_at = now();
        $question->save();

        return response()->json($question);
    }

    public function getUnassignedQuestions()
    {
        $questions = StudentQuestion::whereNull('tutor_id')
            ->orderByDesc('created_at')
            ->get();

        return $questions;
    }
}
