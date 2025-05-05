<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserAccount;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserAccount::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'country_code'=>"IN",
            'contactnumber'=>123456789,
            'password' => Hash::make('StrongPassword123'),
            'confirmedpassword' => Hash::make('StrongPassword123'),
            'serviceType'=>'none',
            'role' => 'admin', // assuming you have a 'role' column
        ]);
    }
}
