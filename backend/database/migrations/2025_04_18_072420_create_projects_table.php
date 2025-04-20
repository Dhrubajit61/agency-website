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
    Schema::create('projects', function (Blueprint $table) {
        $table->id();
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
