<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'tags',
        'author_id',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class, 'article_id');
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'article_id');
    }
}
