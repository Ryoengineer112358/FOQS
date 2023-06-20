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
    Route::group(['middleware' => ['verified']], function () {
        Route::post('/questions/{question}', [
            QuestionController::class,
            'reply',
        ]);
        Route::post('/questions/{question}/solve', [
            QuestionController::class,
            'solve',
        ]);
        Route::apiResource('questions', QuestionController::class)->only(
            'index',
            'show'
        );
        Route::get('/tutors/{tutorId}/average-rating', [
            TutorController::class,
            'getAgerageTutorRating',
        ]);
    });
});

Route::group(['middleware' => ['auth:students', 'verified']], function () {
    Route::get('/tutors', [TutorController::class, 'index']);
    Route::post('/questions', [QuestionController::class, 'store']);
    Route::post('questions/{question}/rate', [
        QuestionController::class,
        'rateTutor',
    ]);
    Route::delete('/questions/{question}', [
        QuestionController::class,
        'destroy',
    ]);
});

Route::group(['middleware' => ['auth:tutors', 'verified']], function () {
    Route::get('/unassigned-questions', [
        QuestionController::class,
        'getUnassignedQuestions',
    ]);
    Route::put('/questions/{question}', [QuestionController::class, 'update']);
});
