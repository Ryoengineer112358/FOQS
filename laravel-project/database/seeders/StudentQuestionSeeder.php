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
            'content'=>'写真の問題の途中式並びに解答を教えてください。よろしくおねがいします。',
            'student_id'=>1,
            'tutor_id'=>1,
        ]);

        StudentQuestion::create([
            'content'=>'「お腹が空いていたら何でもおいしく見える」の英語訳が何故「Everything looks delicious when you are hungry.」となるのでしょうか。「you」は「あなた」という意味ではないのですか？',
            'student_id'=>1,
            'tutor_id'=>2,
        ]);
    }
}
