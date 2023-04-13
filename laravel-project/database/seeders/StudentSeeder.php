<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Student::create([
            'last_name'=>'高島',
            'first_name'=>'良平',
            'email'=>'takashimaryohei@gmail.com',
            'password'=>bcrypt('password'),
            'email_verified_at'=>now(),
            'high_school'=>'巣鴨高校',
            'first_choice_university'=>'東京大学',
            'first_choice_faculty'=>'文科三類',
            'birth_date'=> '1996-07-28',
            'gender'=> 0 ,
        ]);

        Student::create([
            'last_name'=>'EmailVerifyしない',
            'first_name'=>'ウーマン',
            'email'=>'dontverifyemail@gmail.com',
            'password'=>bcrypt('password'),
            'email_verified_at'=>null,
            'high_school'=>'開成',
            'first_choice_university'=>'東京大学',
            'first_choice_faculty'=>'理科三類',
            'birth_date'=> '2000-06-30',
            'gender'=> 1 ,
        ]);
    }
}
