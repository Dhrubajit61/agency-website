<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\support\Facades\Auth;
use App\Models\Project_requests;
use App\Models\UserAccount;


class userprojectscontroller extends Controller
{
    public function myprojects(Request $request){
        $user = Auth::user();
        $userId = $user->id;

        // Assuming Project_request has a user_id column
        $projects = Project_requests::where('user_id', $userId)->get();

        return response()->json(['message' => 'details fetched successfully', 
        'projectlists'=>$projects,], 200);

    }
}
