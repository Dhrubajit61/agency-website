<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userprojectlistmodel extends Model
{
    use HasFactory;
    protected $table = 'user_project_lists'; // Specify the table name
    protected $fillable = [
        'user_id',
        'title',
        'business_category',
        'development_type',
        'description',
        'features',
        'budget_range',
        'timeline',
        'reference_links',
        'notes',
    ];
}
