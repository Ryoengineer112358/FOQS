<?php

namespace Database\Seeders;

use App\Models\StudentQuestion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StudentQuestion::create([
            'text' =>
                '写真の問題の途中式並びに解答を教えてください。よろしくおねがいします。',
            'tutor_checked' => true,
            'closed_at' => null,
            'tutor_rating' => null,
            'student_id' => 1,
            'tutor_id' => 1,
        ]);

        StudentQuestion::create([
            'text' =>
                '「お腹が空いていたら何でもおいしく見える」の英語訳が何故「Everything looks delicious when you are hungry.」となるのでしょうか。「you」は「あなた」という意味ではないのですか？',
            'tutor_checked' => false,
            'closed_at' => null,
            'tutor_rating' => null,
            'student_id' => 1,
            'tutor_id' => 2,
        ]);

        StudentQuestion::create([
            'text' =>
                '次の問題に、途中式も含めて回答してください。極座標 (r, θ) で表される点 (r > 0) が、極座標 (2, π/4) と (3, 3π/4) の中点上にあるとき、その点の極座標を求めてください。',
            'tutor_checked' => false,
            'closed_at' => null,
            'tutor_rating' => null,
            'student_id' => 1,
            'tutor_id' => 1,
        ]);
    }
}
