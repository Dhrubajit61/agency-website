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
        if($userrole=='admin'){
            $pendingprojects = Project_requests::where('status', 'pending')->with('user:id,name')->get();
            //$pendingCount = Project_requests::where('status', 'pending')->count();
            return response()->json([
                'message'=>'nice you are admin',
                'pendingprojects'=>$pendingprojects,
                //'pendingcount'=>$pendingCount,
            ],200);
        }
    }
}
