<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentQuestion extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $dateFormat = 'Y-m-d H:i:s.v';

    protected $dates = ['created_at', 'updated_at'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function tutor_answers()
    {
        return $this->hasMany(TutorAnswer::class);
    }

    public function student_comments()
    {
        return $this->hasMany(StudentComment::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
