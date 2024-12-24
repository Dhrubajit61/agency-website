<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;
use App\Http\Controllers\user_accounts;
use App\Http\Controllers\LoginController;
use Laravel\Passport\Passport;
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
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/submit-form', [FormController::class, 'store']);
Route::post('/create-users', [user_accounts::class, 'storeusers']);
Route::post('/login',[LoginController::class, 'login']);