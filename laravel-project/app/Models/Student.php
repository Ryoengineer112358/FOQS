<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Student extends Authenticatable implements MustVerifyEmail
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function student_questions()
    {
        return $this->hasMany(StudentQuestion::class);
    }
}

