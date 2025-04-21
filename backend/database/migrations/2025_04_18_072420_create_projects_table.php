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
    Schema::create('project_requests', function (Blueprint $table) {
        $table->id(); // creates unsignedBigInteger
        $table->unsignedBigInteger('user_id'); // foreign key column
        $table->string('title');
        $table->string('business_category');
        $table->text('development_type')->nullable();
        $table->text('description');
        $table->text('features')->nullable();
        $table->string('budget_range')->nullable();
        $table->string('timeline')->nullable();
        $table->text('reference_links')->nullable();
        $table->text('notes')->nullable();
        $table->timestamps();
    
        // Foreign key pointing to custom users table
        $table->foreign('user_id')->references('id')->on('user_accounts')->onDelete('cascade');
    });
    
    
    
}
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
