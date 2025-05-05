<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'file_path',
        'tags',
        'uploaded_by',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class, 'document_id');
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'document_id');
    }
}
