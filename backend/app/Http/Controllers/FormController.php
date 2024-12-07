<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormData;
use Illuminate\Support\Facades\Validator;

class FormController extends Controllers
{
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'country'=>'nullable|string|max:20',
        'contactnumber' => 'nullable|max:13',
        'subject' => 'nullable|max:255',
        'message' => 'required|string',
    ], [
        'name.required' => 'The name field is mandatory.',
        'name.max' => 'The name should not be greater than 255 characters.',
        'email.required' => 'We need your email address.',
        'email.email' => 'Please provide a valid email address.',
        'email.max' => 'The email should not be greater than 255 characters.',
        'contactnumber.max' => 'The contact number should not be greater than 13 characters.',
        'subject.max' => 'The subject should not be greater than 255 characters.',
        'message.required' => 'Please provide a message.',
    ]);

    if ($validator->fails()) {
        // Return all errors in a JSON response
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()->all(),
        ], 201); // 422 Unprocessable Entity
    }

    try {
        $formData = FormData::create($validator->validated());

        return response()->json(['success' => true, 'data' => $formData], 201);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500); // Internal Server Error
    }
}
}
