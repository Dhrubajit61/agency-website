<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project_requests extends Model
{
    use HasFactory;
    protected $table = 'project_requests'; // Specify the table name
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
    
    public function files()
    {
        return $this->hasMany(ProjectFile::class);
    }
    
    

}
