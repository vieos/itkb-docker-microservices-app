<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Comment;
use App\Models\Reaction;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all();
        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'tags' => 'array',
        ]);

        $article = Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'tags' => $request->tags,
            'author_id' => Auth::id(),
        ]);

        return response()->json($article, 201);
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    public function comment(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'article_id' => $id,
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
            ['user_id' => Auth::id(), 'article_id' => $id],
            ['type' => $request->type]
        );

        return response()->json($reaction, 200);
    }
}
