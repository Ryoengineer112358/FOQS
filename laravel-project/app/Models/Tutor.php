<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Tutor extends Authenticatable implements MustVerifyEmail
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function student_questions()
    {
        return $this->hasMany(StudentQuestion::class);
    }

    public function tutor_answers()
    {
        return $this->hasMany(TutorAnswer::class);
    }

    public function student_comments()
    {
        return $this->hasMany(StudentComment::class);
    }
}
