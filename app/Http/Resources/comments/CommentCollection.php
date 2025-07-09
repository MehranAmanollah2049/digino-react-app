<?php

namespace App\Http\Resources\comments;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CommentCollection extends ResourceCollection
{
    public static $wrap = null;

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($comment) {

            $user = $comment->user;

            return [
                'id' => $comment->id,
                'text' => $comment->text,
                'score' => $comment->score,
                'user' => "$user->name $user->lastname",
                'time' => Carbon::createFromFormat('Y-m-d H:i:s', $comment->created_at)->diffForHumans(),
                'answers' => new AnswersCollection($comment->answers()->where('active_at' , '<' , now())->get())
            ];  

        });
    }
}
