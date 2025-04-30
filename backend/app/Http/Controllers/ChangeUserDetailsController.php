<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAccount;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ChangeUserDetailsController extends Controller
{
    public function changedetails(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access.',
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'contactnumber'=>'max:13',
           // 'email' => 'required|email|max:255|unique:user_accounts,email,' . $user->id,
            // If you want to change password, uncomment below:
            // 'password' => 'nullable|min:6|confirmed',
        ], );

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()->all(),
            ], 422);
        }

        try {
            $data = $validator->validated();

            // Update user info
            $user->name = $data['name'];
            $user->contactnumber=$data['contactnumber'];
            //$user->email = $data['email'];

            // If password change is needed:
            // if (!empty($data['password'])) {
            //     $user->password = Hash::make($data['password']);
            // }

            $user->save();

            return response()->json([
                'valid' => true,
                'message' => 'User details updated successfully.',
                'user' => $user,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'valid' => false,
                'message' => 'Something went wrong: ' . $e->getMessage(),
            ], 500);
        }
    }
}
