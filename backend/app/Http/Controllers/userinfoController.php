<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Laravel\Passport\Token;


class userinfoController extends Controller
{
    public function userInfo(Request $request)
{
    $token = $request->cookie('access_token');
    if (!$token) return response()->json(['valid' => false, 'message' => 'No token found']);

    $tokenId = explode('|', $token)[0];
    $tokenModel = Token::find($tokenId);
    if (!$tokenModel) return response()->json(['valid' => false, 'message' => 'Invalid token ID']);

    $user = $tokenModel->user;
    if (!$user) return response()->json(['valid' => false, 'message' => 'User not found']);

    return response()->json(['valid' => true, 'user' => $user]);

}
}