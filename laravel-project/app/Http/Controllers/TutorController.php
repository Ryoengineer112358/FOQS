<?php

namespace App\Http\Controllers;

use App\Models\StudentQuestion;
use Illuminate\Http\Request;
use App\Models\Tutor;

class TutorController extends Controller
{
    function index()
    {
        return Tutor::all();
    }

    public function getAgerageTutorRating(Request $request, $tutorId)
    {
        $twoMonthsAgo = now()->subMonths(2);

        $averageRating = StudentQuestion::where('tutor_id', $tutorId)
            ->where('tutor_rating', '>=', 0)
            ->where('tutor_rating', '<=', 5)
            ->where('created_at', '>=', $twoMonthsAgo)
            ->avg('tutor_rating');

        return response()->json(['average_rating' => $averageRating]);
    }
}
