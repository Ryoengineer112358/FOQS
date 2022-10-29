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
            'name'=>'高島良平',
            'email'=>'takashimaryohei@gmail.com',
            'password'=>bcrypt('password'),
            'high_school'=>'巣鴨高校',
            'first_choice_university'=>'東京大学',
            'age'=> 26,
            'sex'=> 0 ,
        ]);
    }
}
//name, email, password, high_school, first_choice_university, age, sex
