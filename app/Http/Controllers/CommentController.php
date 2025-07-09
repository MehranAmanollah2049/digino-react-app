<?php

namespace App\Http\Controllers;

use App\Http\Resources\comments\CommentCollection;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function add_comment(Request $request,Product $product)
    {
        $validated = $request->validate([
            'text' => ['required','string'],
            'score' => ['required','string'],
        ]);

        $product->comments()->create([
            'user_id' => $request->user()->id,
            'text' => nl2br($validated['text']),
            'score' => $validated['score'],
            'active_at' => now()->addMinutes(1)
        ]);

        return response('ok');
    }

    public function add_answer(Request $request,Comment $comment)
    {
        $validated = $request->validate([
            'text' => ['required','string'],
            'answerable_id' => ['required','string'],
            'answerable_type' => ['required','string'],
        ]);

        $comment->answers()->create([
            'user_id' => $request->user()->id,
            'text' => nl2br($validated['text']),
            'answerable_id' => $validated['answerable_id'],
            'answerable_type' => 'App\Models\\' . $validated['answerable_type'],
            'active_at' => now()->addMinutes(1)
        ]);

        return response('ok');
    }

    public function comments(Product $product,Request $request)
    {
        $comments = $product->comments()->where('active_at' , '<' , now())->paginate($request->perPage ?? 8);

        return response([
            'data' => new CommentCollection($comments),
            'pagination' => [
                'current' => $comments->currentPage(),
                'total' => $comments->lastPage(),
            ],
        ]);
    }
}
