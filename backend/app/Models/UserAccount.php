<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class UserAccount extends Authenticatable
{   
    use HasApiTokens, Notifiable;
    
    protected $table = 'user_accounts'; // Specify the table name
    
    protected $fillable = ['name', 'email','country_code','contactnumber','password', 'confirmedpassword', 'serviceType'];
}
