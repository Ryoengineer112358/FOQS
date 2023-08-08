<?php

namespace Tests\Feature\Auth;

use App\Models\Student;
use App\Models\Tutor;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_students_can_verify_email()
    {
        $student = Student::factory()->create([
            'email_verified_at' => null,
        ]);

        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $student->id, 'hash' => sha1($student->email)]
        );

        $response = $this->actingAs($student)->get($verificationUrl);

        Event::assertDispatched(Verified::class);
        $this->assertTrue($student->fresh()->hasVerifiedEmail());
        $response->assertRedirect(config('app.frontend_url') . '/student');
    }

    public function test_students_cannot_verify_email_with_invalid_hash()
    {
        $student = Student::factory()->create([
            'email_verified_at' => null,
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $student->id, 'hash' => sha1('wrong-email')]
        );

        $this->actingAs($student)->get($verificationUrl);

        $this->assertFalse($student->fresh()->hasVerifiedEmail());
    }

    public function test_tutors_can_verify_email()
    {
        $tutor = Tutor::factory()->create([
            'email_verified_at' => null,
        ]);

        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $tutor->id, 'hash' => sha1($tutor->email)]
        );

        $response = $this->actingAs($tutor)->get($verificationUrl);

        Event::assertDispatched(Verified::class);
        $this->assertTrue($tutor->fresh()->hasVerifiedEmail());
        $response->assertRedirect(config('app.frontend_url') . '/tutor');
    }

    public function test_tutors_cannot_verify_email_with_invalid_hash()
    {
        $tutor = Tutor::factory()->create([
            'email_verified_at' => null,
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $tutor->id, 'hash' => sha1('wrong-email')]
        );

        $this->actingAs($tutor)->get($verificationUrl);

        $this->assertFalse($tutor->fresh()->hasVerifiedEmail());
    }
}
