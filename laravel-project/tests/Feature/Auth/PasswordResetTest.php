<?php

namespace Tests\Feature\Auth;

use App\Models\Student;
use App\Models\Tutor;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_students_can_request_reset_password_link()
    {
        Notification::fake();

        $student = Student::factory()->create();

        $this->post('/forgot-password', ['email' => $student->email, 'user_type' => 'student']);

        Notification::assertSentTo($student, ResetPasswordNotification::class);
    }

    public function test_tutors_can_request_reset_password_link()
    {
        Notification::fake();

        $tutor = Tutor::factory()->create();

        $this->post('/forgot-password', ['email' => $tutor->email, 'user_type' => 'tutor']);

        Notification::assertSentTo($tutor, ResetPasswordNotification::class);
    }

    public function test_students_can_reset_password_with_valid_token()
    {
        Notification::fake();

        $student = Student::factory()->create();

        $this->post('/forgot-password', ['email' => $student->email, 'user_type' => 'student']);

        Notification::assertSentTo($student, ResetPasswordNotification::class, function (
            $notification
        ) use ($student) {
            $response = $this->post('/reset-password', [
                'token' => $notification->token,
                'email' => $student->email,
                'password' => 'new_password',
                'password_confirmation' => 'new_password',
                'user_type' => 'student',
            ]);

            $response->assertSessionHasNoErrors();

            return true;
        });
    }

    public function test_tutors_can_reset_password_with_valid_token()
    {
        Notification::fake();

        $tutor = Tutor::factory()->create();

        $this->post('/forgot-password', ['email' => $tutor->email, 'user_type' => 'tutor']);

        Notification::assertSentTo($tutor, ResetPasswordNotification::class, function (
            $notification
        ) use ($tutor) {
            $response = $this->post('/reset-password', [
                'token' => $notification->token,
                'email' => $tutor->email,
                'password' => 'new_password',
                'password_confirmation' => 'new_password',
                'user_type' => 'tutor',
            ]);

            $response->assertSessionHasNoErrors();

            return true;
        });
    }
}
