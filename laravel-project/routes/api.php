<?php

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TutorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware(['auth:students,tutors'])->get('/myself', function (Request $request) {
//    return $request->user();
//});

Route::group(['middleware' => ['auth:students,tutors']], function () {
    Route::get('/myself', function (Request $request) {
        return $request->user();
    });
});

Route::group(['middleware' => ['auth:students']], function () {
    Route::get('/tutors', [TutorController::class, 'index']);
});

Route::group(['middleware' => ['auth']], function () {
    Route::apiResource('questions', QuestionController::class)->only('index','show');
});
