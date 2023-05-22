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
        Schema::table('student_questions', function (Blueprint $table) {
            $table->dropForeign(['tutor_id']);;
            $table->dropColumn('tutor_id');
        });
        Schema::table('student_questions', function (Blueprint $table) {
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
        Schema::table('student_questions', function (Blueprint $table) {
            $table->dropForeign(['tutor_id']);;
            $table->dropColumn('tutor_id');
        });
        Schema::table('student_questions', function (Blueprint $table) {
            $table
                ->foreignId('tutor_id')
                ->nullable()
                ->constrained();
        });
    }
};
