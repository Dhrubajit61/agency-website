<?php

namespace App\Http\Controllers;
use App\Models\Project_requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class projectsforadmincontroller extends Controller
{
    public function adminprojects(Request $request){
        $user = Auth::user();
        $userrole = $user->role;
        $status = $request->input('status');
        if($userrole=='admin'){
            $projects = Project_requests::where('status', $status)->with('user:id,name')->get();
            $pendingCount = Project_requests::where('status', 'pending')->count();
            $approvedCount = Project_requests::where('status', 'approved')->count();
            $totalprojects=$pendingCount+$approvedCount;
            return response()->json([
                'message'=>'nice you are admin',
                'projects'=>$projects,
                'pendingcount'=>$pendingCount,
                'totalprojects'=>$totalprojects,
                'approvedcount'=>$approvedCount,
            ],200);
        }
    }
}
