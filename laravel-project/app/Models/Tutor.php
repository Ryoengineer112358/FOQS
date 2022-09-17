<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

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
