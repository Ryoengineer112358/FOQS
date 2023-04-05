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
            'high_school'=>'巣鴨高校',
            'first_choice_university'=>'東京大学',
            'first_choice_faculty'=>'文科三類',
            'birth_date'=> '1996-07-28',
            'gender'=> 0 ,
        ]);
    }
}
