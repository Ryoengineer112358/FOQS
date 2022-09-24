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
            'name'=>'五嶋俊彬',
            'email'=>'gototoshiaki@gmail.com',
            'password'=>bcrypt('password'),
            'university'=>'京都大学',
            'age'=>25,
            'sex'=>'0',
        ]);
    }
}
