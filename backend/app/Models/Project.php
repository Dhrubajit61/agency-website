<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
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
