<?php

namespace Tests\Feature\Auth;

use App\Models\Student;
use App\Models\Tutor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_students_can_authenticate_using_the_login_screen()
    {
        $student = Student::factory()->create();

        $response = $this->post('/login', [
            'email'    => $student->email,
            'password' => 'password',
            'user_type'=> 'student',
        ]);

        $this->assertAuthenticated('students');
        $response->assertStatus(204);
    }

    public function test_students_can_not_authenticate_with_invalid_password()
    {
        $student = Student::factory()->create();

        $this->post('/login', [
            'email'    => $student->email,
            'password' => 'wrong-password',
            'user_type'=> 'student',
        ]);

        $this->assertGuest('students');
    }

    public function test_tutors_can_authenticate_using_the_login_screen()
    {
        $tutor = Tutor::factory()->create();

        $response = $this->post('/login', [
            'email'    => $tutor->email,
            'password' => 'password',
            'user_type'=> 'tutor',
        ]);

        $this->assertAuthenticated('tutors');
        $response->assertStatus(204);
    }

    public function test_tutors_can_not_authenticate_with_invalid_password()
    {
        $tutor = Tutor::factory()->create();

        $this->post('/login', [
            'email'    => $tutor->email,
            'password' => 'wrong-password',
            'user_type'=> 'tutor',
        ]);

        $this->assertGuest('tutors');
    }
}
