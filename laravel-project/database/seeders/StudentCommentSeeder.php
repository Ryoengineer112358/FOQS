<?php

namespace Database\Seeders;

use App\Models\StudentComment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            'content'=>'理解しました。ありがとうございました！！',
            'student_question_id'=>1,
            'tutor_id'=>1,
        ]);

        StudentComment::create([
            'content'=>'「You」ではなく「We」ではダメなのですか？',
            'student_question_id'=>2,
            'tutor_id'=>2,
        ]);
    }
}
