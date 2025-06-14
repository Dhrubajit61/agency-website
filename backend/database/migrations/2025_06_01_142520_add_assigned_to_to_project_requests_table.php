<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('project_requests', function (Blueprint $table) {
            $table->unsignedBigInteger('assigned_to')->nullable()->after('id'); // or after any other column
        });
    }

    public function down(): void
    {
        Schema::table('project_requests', function (Blueprint $table) {
            $table->dropColumn('assigned_to');
        });
    }
};
