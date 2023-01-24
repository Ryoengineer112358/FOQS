<?php

namespace App\Http\Controllers;

use App\Models\StudentQuestion;
use App\Models\TutorAnswer;
use Illuminate\Http\Request;
use App\Models\StudentComment;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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

        $questions = $query->orderByDesc('updated_at')
            ->with(
                [
                    'tutor_answers' => function ($query) {
                        $query->orderBy('created_at', 'desc');
                    },
                    'student_comments' => function ($query) {
                        $query->orderBy('created_at', 'desc');
                    },
                ]
            )
            ->get();

        foreach ($questions as $question) {
            $question->tutor_answers = $question->tutor_answers->sortByDesc("created_at");
            $question->student_comments = $question->student_comments->sortByDesc("created_at");
        }

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(StudentQuestion $question)
    {
        \Log::info(collect([$question]));
        $tutorAnswers = TutorAnswer::where('tutor_id', $question->tutor_id)->get()->each(fn($x) => $x->sender_role = 'tutor');
//        \Log::info($tutorAnswers);
        $studentComments = StudentComment::where('tutor_id', $question->tutor_id)->get()->each(fn($x) => $x->sender_role = 'student');
//        \Log::info($studentComments);
        $messages = collect([$question])->concat($tutorAnswers)->concat($studentComments)->sortBy('created_at')->values();
//        \Log::info($messages);
        return $messages;
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function reply(Request $request, StudentQuestion $question)
    {
        if ($request->user()->cannot('view', $question)) {
            abort(403);
        }

        $studentAuth = \Auth::guard('students')->check();
        $tutorAuth = \Auth::guard('tutors')->check();

        if ($studentAuth) {
            StudentComment::create([
                'content' => $request->message,
                'student_question_id' => $question->id,
                'tutor_id' => $question->tutor_id,
            ]);
        }

        if ($tutorAuth) {
            TutorAnswer::create([
                'content' => $request->message,
                'student_question_id' => $question->id,
                'tutor_id' => $question->tutor_id,
            ]);
        }
    }
}
