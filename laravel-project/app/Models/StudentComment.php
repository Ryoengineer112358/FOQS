<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentComment extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $dateFormat = 'Y-m-d H:i:s.v';

    protected $dates = ['created_at', 'updated_at'];

    public function student_question()
    {
        return $this->belongsTo(StudentQuestion::class);
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
