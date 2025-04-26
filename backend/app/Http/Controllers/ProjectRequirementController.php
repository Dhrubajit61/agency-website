<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project_requests;
use Illuminate\Support\Facades\Validator;
use App\Models\ProjectFile;
use Illuminate\Support\Facades\Auth;


class ProjectRequirementController extends Controller
{
    public function store(Request $request)
{
    $user = Auth::user();
    $userId = $user->id;
 
    $validated = $request->validate([
        'title' => 'required|string',
        'business_category' => 'required |string',
        'development_type' => 'required | array',
        'description' => 'required | string',
        'features' => 'array',
        'budget_range' => 'nullable|string',
        'timeline' => 'nullable|string',
        'reference_links' => 'nullable|string',
        'notes' => 'nullable|string',
        'project_files.*' => 'file|mimes:pdf,doc,docx,png,jpg,jpeg,zip|max:20480',
    ]);

    $validator = Validator::make($request->all(), [
       'title' => 'required|string',
        'business_category' => 'required |string',
        'development_type' => 'required | array',
        'description' => 'required | string',
        'features' => 'array',
        'budget_range' => 'nullable|string',
        'timeline' => 'nullable|string',
        'reference_links' => 'nullable|string',
        'notes' => 'nullable|string',
        'project_files.*' => 'file|mimes:pdf,doc,docx,png,jpg,jpeg,zip|max:20480',
    ], [
        'title.required' => 'The name field is mandatory.',
        'business_category.required' => 'Please select business category',
        'development_type.required' => 'Please select development type',
        'description.required' => 'Please write some description of the project',
        
    ]);

    if ($validator->fails()) {
        // Return all errors in a JSON response
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()->all(),
        ], 201); // 422 Unprocessable Entity
    }




    

    

try {
   // Save files
   if ($request->hasFile('project_files')) {
    foreach ($request->file('project_files') as $file) {
        $file->store('project_uploads');
    }
}

// Store the project data in DB if needed
$project = Project_requests::create([
    'user_id'=>$userId,
    'title' => $request->title,
    'business_category' => $request->business_category,
    'development_type' => json_encode($request->development_type),
    'description' => $request->description,
    'features' => json_encode($request->features),
    'budget_range' => $request->budget_range,
    'timeline' => $request->timeline,
    'reference_links' => $request->reference_links,
    'notes' => $request->notes,
]);

if ($request->hasFile('project_files')) {
    foreach ($request->file('project_files') as $file) {
        $path = $file->store('project_files', 'public');
        ProjectFile::create([
            'project_id' => $project->id,
            'file_path' => $path,
        ]);
    }
}

return response()->json(['message' => 'Requirement submitted successfully', 
'projectid'=>$project->id,
], 200);

    
} catch (\Exception $e) {
    return response()->json([
        'success' => false,
        'message' => $e->getMessage(),
    ], 201); // Internal Server Error
}

}
}
