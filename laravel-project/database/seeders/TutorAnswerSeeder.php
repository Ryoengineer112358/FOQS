<?php

namespace Database\Seeders;

use App\Models\TutorAnswer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TutorAnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TutorAnswer::create([
            'text'=>'問題確認しました。少々お待ちください。',
            'tutor_id'=>1,
            'student_question_id'=>1,
        ]);

        TutorAnswer::create([
            'text'=>'できました！写真確認お願いします！',
            'tutor_id'=>1,
            'student_question_id'=>1,
        ]);

        TutorAnswer::create([
            'text'=>'このYouは「総称のyou」であり「あなた」ではなく「(自分も含めた)全員」という意味になります',
            'tutor_id'=>2,
            'student_question_id'=>2,
        ]);
    }
}
