<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\UserAccount;
use App\Models\Project_requests;

class Projectapprovalcontroller extends Controller
{
    public function approval(Request $req)
{
    $user = Auth::user();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized access.',
        ], 401);
    }

    $projectId = $req->project_id;

    $project = Project_requests::find($projectId);

    if (!$project) {
        return response()->json([
            'success' => false,
            'message' => 'Project not found.',
        ], 404);
    }

    $project->status = 'approved'; // or 'rejected', depending on your logic
    $project->save();

    return response()->json([
        'success' => true,
        'message' => 'Project approved successfully.',
    ], 200);
}

    public function reject(Request $req){
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access.',
            ], 401);
        }

    }
}
