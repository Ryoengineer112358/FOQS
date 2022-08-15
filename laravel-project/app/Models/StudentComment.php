<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentComment extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function student_question()
    {
        return $this->belongsTo(StudentQuestion::class);
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }
}
