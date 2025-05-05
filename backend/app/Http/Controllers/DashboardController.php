<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\Article;

class DashboardController extends Controller
{
    public function index()
    {
        $totalDocuments = Document::count();
        $totalArticles = Article::count();
        $recentDocuments = Document::orderBy('created_at', 'desc')->take(5)->get();
        $recentArticles = Article::orderBy('created_at', 'desc')->take(5)->get();

        return response()->json([
            'totalDocuments' => $totalDocuments,
            'totalArticles' => $totalArticles,
            'recentDocuments' => $recentDocuments,
            'recentArticles' => $recentArticles,
        ]);
    }
}
