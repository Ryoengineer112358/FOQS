<?php

namespace Database\Seeders;

use App\Models\Tutor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tutor::create([
            'last_name'=>'五嶋',
            'first_name'=>'俊彬',
            'email'=>'gototoshiaki@gmail.com',
            'password'=>bcrypt('password'),
            'university'=>'京都大学',
            'age'=>25,
            'sex'=> 0,
        ]);

        Tutor::create([
            'last_name'=>'須田',
            'first_name'=>'皓',
            'email'=>'sudaakira@gmail.com',
            'password'=>bcrypt('password'),
            'university'=>'東京大学',
            'age'=>26,
            'sex'=> 0,
        ]);
    }
}
