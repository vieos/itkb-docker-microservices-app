<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\Comment;
use App\Models\Reaction;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::all();
        return response()->json($documents);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf',
            'tags' => 'array',
        ]);

        $filePath = $request->file('file')->store('documents');

        $document = Document::create([
            'title' => $request->title,
            'file_path' => $filePath,
            'tags' => $request->tags,
            'uploaded_by' => Auth::id(),
        ]);

        return response()->json($document, 201);
    }

    public function show($id)
    {
        $document = Document::findOrFail($id);
        return response()->json($document);
    }

    public function comment(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'document_id' => $id,
            'content' => $request->content,
        ]);

        return response()->json($comment, 201);
    }

    public function reaction(Request $request, $id)
    {
        $request->validate([
            'type' => 'required|in:like,dislike',
        ]);

        $reaction = Reaction::updateOrCreate(
            ['user_id' => Auth::id(), 'document_id' => $id],
            ['type' => $request->type]
        );

        return response()->json($reaction, 200);
    }
}
