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
        Schema::create('student_questions', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->timestamps();
            $table->timestamp('solved_at')->nullable();
            $table
                ->foreignId('student_id')
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreignId('tutor_id')
                ->constrained()
                ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_questions');
    }
};
