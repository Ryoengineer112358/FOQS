<?php

namespace Tests\Feature;

use App\Models\Student;
use App\Models\StudentQuestion;
use App\Models\Tutor;
use Artisan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuestionControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        Artisan::call('migrate');
    }
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_guests_cannot_retrieve_questions()
    {
        $response = $this->getJson(route('questions.index'));

        $response->assertStatus(401);
    }

    public function test_students_can_retrieve_closed_questions()
    {
        $student = Student::factory()->create();

        $closedQuestions = StudentQuestion::factory()->count(5)->create([
            'student_id' => $student->id,
            'closed_at' => now(),
        ]);

        $this->actingAs($student, 'students');

        $response = $this->getJson(route('questions.index', ['closed_only' => true]));

        $response->assertStatus(200)
                 ->assertJsonCount(5);

        foreach ($closedQuestions as $question) {
            $response->assertJsonFragment([
                'id' => $question->id,
            ]);
        }
    }

    public function test_students_can_retrieve_unclosed_questions()
    {
        $student = Student::factory()->create();

        $unclosedQuestions = StudentQuestion::factory()->count(5)->create([
            'student_id' => $student->id,
            'closed_at' => null,
        ]);

        $this->actingAs($student, 'students');

        $response = $this->getJson(route('questions.index', ['closed_only' => false]));

        $response->assertStatus(200)
                 ->assertJsonCount(5);

        foreach ($unclosedQuestions as $question) {
            $response->assertJsonFragment([
                'id' => $question->id,
            ]);
        }
    }

    public function test_tutors_can_retrieve_closed_questions()
    {
        $tutor = Tutor::factory()->create();

        $closedQuestions = StudentQuestion::factory()->count(5)->create([
            'tutor_id' => $tutor->id,
            'closed_at' => now(),
        ]);

        $this->actingAs($tutor, 'tutors');

        $response = $this->getJson(route('questions.index', ['closed_only' => true]));

        $response->assertStatus(200)
                ->assertJsonCount(5);

        foreach ($closedQuestions as $question) {
            $response->assertJsonFragment([
                'id' => $question->id,
            ]);
        }
    }

    public function test_tutors_can_retrieve_unclosed_questions()
    {
        $tutor = Tutor::factory()->create();

        $unclosedQuestions = StudentQuestion::factory()->count(5)->create([
            'tutor_id' => $tutor->id,
            'closed_at' => null,
        ]);

        $this->actingAs($tutor, 'tutors');

        $response = $this->getJson(route('questions.index', ['closed_only' => false]));

        $response->assertStatus(200)
                ->assertJsonCount(5);

        foreach ($unclosedQuestions as $question) {
            $response->assertJsonFragment([
                'id' => $question->id,
            ]);
        }
    }
}
