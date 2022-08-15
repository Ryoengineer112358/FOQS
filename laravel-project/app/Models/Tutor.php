<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    public function tutor_answers()
    {
        return $this->hasMany(TutorAnswer::class);
    }

    public function student_comments()
    {
        return $this->hasMany(StudentComment::class);
    }
}
