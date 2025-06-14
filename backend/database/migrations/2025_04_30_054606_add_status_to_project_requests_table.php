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
    Schema::table('project_requests', function (Blueprint $table) {
        $table->enum('status', ['Pending', 'Approved', 'Rejected'])->default('pending');
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
{
    Schema::table('project_requests', function (Blueprint $table) {
        $table->dropColumn('status');
    });
}
};
