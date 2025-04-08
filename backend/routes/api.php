<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;
use App\Http\Controllers\user_accounts;
use App\Http\Controllers\LoginController;
use Laravel\Passport\Passport;
use App\Http\Controllers\UserInfoController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::prefix('oauth')->group(function () {
//     Passport::routes();
// });

Route::post('/submit-form', [FormController::class, 'store']);
Route::post('/create-users', [user_accounts::class, 'storeusers']);
Route::post('/login',[LoginController::class, 'login']);
use Illuminate\Support\Facades\Auth;

Route::get('/check-token', function () {
    try {
        // Check if the user is authenticated
        if (Auth::check()) {
            return response()->json(['valid' => true], 200);
        } else {
            return response()->json(['valid' => false,'message'=>"some error" ], 401);
        }
    } catch (\Exception $e) {
        return response()->json(['exception' => false], 401);
    }
});

Route::middleware('auth:api')->get('/user-info', function (Request $request) {
    return response()->json(['valid' => true, 'user' => $request->user()]);
});


