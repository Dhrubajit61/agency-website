<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UserAccount;

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
    //relationship with user
    public function user()
{
    return $this->belongsTo(UserAccount::class, 'user_id');
}
public function assignedStaff()
{
    return $this->belongsTo(UserAccount::class, 'assigned_to', 'id');
}
    
    

}
