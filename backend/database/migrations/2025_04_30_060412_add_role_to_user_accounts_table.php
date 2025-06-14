<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::table('user_accounts', function (Blueprint $table) {
        $table->enum('role', ['admin', 'staff', 'client'])->default('client');
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
{
    Schema::table('user_accounts', function (Blueprint $table) {
        $table->dropColumn('role');
    });
}
};
