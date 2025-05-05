<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DesignSetting extends Model
{
    protected $fillable = [
        'key',
        'value',
    ];

    public $timestamps = false;
}
