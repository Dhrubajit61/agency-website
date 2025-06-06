<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserAccount;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Check if user exists
        $user = UserAccount::where('email', $request->input('email'))->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'errors' => ['Wrong username or password']
            ], 200);
        }

        // Check if the password matches
        if (!Hash::check($request->input('password'), $user->password)) {
            return response()->json([
                'success' => false,
                'errors' => ['Wrong username or password']
            ], 200);
        }

        // Attempt to authenticate using Passport personal access token
        $token = $user->createToken('api-token')->accessToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'token' => $token,
            'user' => $user
        ], 200)->cookie('access_token', $token, 60, '/', null, true, true);
    }
}
