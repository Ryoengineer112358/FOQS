<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $dataFormat = 'Y-m-d H:i:s.v';

    protected $dates = ['created_at', 'updated_at'];

    public function imageable()
    {
        return $this->morphTo();
    }
}
