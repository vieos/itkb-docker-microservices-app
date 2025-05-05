<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'document_id',
        'article_id',
        'type', // 'like' or 'dislike'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
