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
        Schema::table('tutors', function (Blueprint $table) {
            $table->string('email', 100)->unique()->change();
            $table->string('faculty', 100)->after('university');
            $table->date('birth_date')->after('faculty');
            $table->dropColumn('age');
            $table->renameColumn('sex', 'gender');
            $table->timestamp('email_verified_at')->nullable()->after('password');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tutors', function (Blueprint $table) {
            $table->string('email', 100)->change();
            $table->dropColumn('faculty');
            $table->unsignedTinyInteger('age')->after('university');
            $table->dropColumn('birth_date');
            $table->renameColumn('gender', 'sex');
            $table->dropColumn('email_verified_at');
        });
    }
};
