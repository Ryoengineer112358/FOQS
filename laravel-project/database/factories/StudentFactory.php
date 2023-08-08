<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'last_name' => $this->faker->lastName,
            'first_name' => $this->faker->firstName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('password'),
            'high_school' => $this->faker->word,
            'first_choice_university' => $this->faker->word,
            'first_choice_faculty' => $this->faker->word,
            'birth_date' => $this->faker->dateTimeBetween('-30 years', '-15 years')->format('Y-m-d'),
            'gender' => $this->faker->randomElement([0,1,2]),
            'remember_token' => Str::random(10),
            'email_verified_at' => now(),
            'quit_at' => null,
        ];
    }
}
