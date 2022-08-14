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
        Schema::create('tutor_answers', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('tutor_id');
            $table->unsignedInteger('student_question_id');
            $table->text('content');
            $table->timestamps();
            $table
                ->foreignId('tutor_id')
                ->constrained();
//                ->cascadeOnDelete();
            $table
                ->foreignId('student_question_id')
                ->constrained()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tutor_answers');
    }
};
