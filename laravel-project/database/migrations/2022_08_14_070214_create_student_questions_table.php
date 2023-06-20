<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_questions', function (Blueprint $table) {
            $table->id();
            $table->text('text');
            $table->timestamps(3);
            $table->boolean('tutor_checked')->nullable();
            $table->timestamp('closed_at')->nullable();
            $table->unsignedTinyInteger('tutor_rating')->nullable();
            $table
                ->foreignId('student_id')
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreignId('tutor_id')
                ->nullable()
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
        Schema::dropIfExists('student_questions');
    }
};
