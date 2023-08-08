<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentQuestion>
 */
class StudentQuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'text' => $this->faker->paragraph,
            'tutor_checked' => $this->faker->randomElement([null, true, false]),
            'closed_at' => $this->faker->randomElement([now(), null]),
            'tutor_rating' => rand(1, 5),
            'student_id' => \App\Models\Student::factory(),
            'tutor_id' => \App\Models\Tutor::factory(),
        ];
    }
}
