<?php

namespace Database\Seeders;

use App\Models\StudentComment;
use Illuminate\Database\Seeder;

class StudentCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StudentComment::create([
            'text' => '理解しました。ありがとうございました！！',
            'student_question_id' => 1,
            'tutor_id' => 1,
        ]);

        StudentComment::create([
            'text' => '「You」ではなく「We」ではダメなのですか？',
            'student_question_id' => 2,
            'tutor_id' => 2,
        ]);
    }
}
