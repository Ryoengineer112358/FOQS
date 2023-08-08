<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_students_can_register()
    {
        $response = $this->post('/register', [
            'user_type' => 'student',
            'last_name' => 'Test Student',
            'first_name' => 'Test Student',
            'email' => 'student@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'birth_date' => '2006-08-21',
            'gender' => 1,
            'high_school' => 'Test High School',
            'first_choice_university' => 'Test University',
            'first_choice_faculty' => 'Test Faculty',
        ]);

        $this->assertAuthenticated('students');
        $response->assertStatus(201);
    }

    public function test_new_tutors_can_register()
    {
        $response = $this->post('/register', [
            'user_type' => 'tutor',
            'last_name' => 'Test Tutor',
            'first_name' => 'Test Tutor',
            'email' => 'tutor@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'birth_date' => '1998-12-05',
            'gender' => 2,
            'university' => 'Test University',
            'faculty' => 'Test Faculty',
        ]);

        $this->assertAuthenticated('tutors');
        $response->assertStatus(201);
    }
}
