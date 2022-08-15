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
        Schema::create('student_comments', function (Blueprint $table) {
            $table->id();
//            $table->unsignedInteger('student_id');
//            $table->unsignedInteger('student_question_id');
//            $table->unsignedInteger('tutor_id');
            $table->text('content');
            $table->timestamps();
            $table
                ->foreignId('student_id')
                ->constrained();
//                ->cascadeOnDelete();
            $table
                ->foreignId('student_question_id')
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreignId('tutor_id')
                ->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_comments');
    }
};
