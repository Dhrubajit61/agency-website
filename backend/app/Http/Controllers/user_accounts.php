<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAccount;
use Illuminate\Support\Facades\Validator;

class user_accounts extends Controller
{
    public function storeusers(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'country_code'=>'nullable|string|max:20',
        'contactnumber' => 'nullable|max:13',
        'password' => 'required|max:255',
        'confirmedpassword' => 'required|same:password',
        'serviceType'=>'required'
    ], [
        'name.required' => 'The name field is mandatory.',
        'name.max' => 'The name should not be greater than 255 characters.',
        'email.required' => 'We need your email address.',
        'email.email' => 'Please provide a valid email address.',
        'email.max' => 'The email should not be greater than 255 characters.',
        'contactnumber.max' => 'The contact number should not be greater than 13 characters.',
        'confirmedpassword.same' => 'Password and confirm password did not match.',
    ]);
    

    if ($validator->fails()) {
        // Return all errors in a JSON response
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()->all(),
        ], 201); // 422 Unprocessable Entity
    }

    try {
        $formData = UserAccount::create($validator->validated());

        return response()->json(['success' => true, 'data' => $formData], 201);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 201); // Internal Server Error
    }
}
}
