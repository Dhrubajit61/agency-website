<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;
use App\Http\Controllers\user_accounts;
use App\Http\Controllers\LoginController;
use Laravel\Passport\Passport;
use App\Http\Controllers\UserInfoController;
use App\Http\Controllers\ProjectRequirementController;
use App\Http\Controllers\userprojectscontroller;
use App\Http\Controllers\ChangeUserDetailsController;
use App\Http\Controllers\projectsforadmincontroller;
use App\Http\Controllers\Projectapprovalcontroller;
use App\Http\Controllers\Staffinfocontroller;

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

 Route::middleware('auth:api')->post('/submit-requirement', [ProjectRequirementController::class, 'store']);
// Route::post('/submit-requirement', [ProjectRequirementController::class, 'store']);

//user project list
Route::middleware('auth:api')->get('/myprojects', [userprojectscontroller::class, 'myprojects']);
Route::middleware('auth:api')->post('/changeuserdetails',[ChangeUserDetailsController::class,'changedetails']);
//controller for adminprojects
Route::middleware('auth:api')->post('/projectsforadmin', [projectsforadmincontroller::class, 'adminprojects']);
// routes/api.php
Route::middleware('auth:api')->post('/adminaction', [Projectapprovalcontroller::class, 'handleAction']);
Route::middleware('auth:api')->get('/staff-info',[Staffinfocontroller::class, 'getstaffinfo']);