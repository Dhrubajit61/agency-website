<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserAccount;

class staffinfocontroller extends Controller
{
    public function getstaffinfo(Request $request){
        $user=Auth::user();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access.',
            ], 401);
        }
        if($user->role=="admin"){
            $staffs=UserAccount::where('role','staff')->get();
            return response()->json(
                [
                    'message'=>'true',
                    'staffs'=>$staffs,
                ],200
            );
        }

            return response()->json(
                [
                    'message'=>'true',
                ],200
            );
        }

    
}
