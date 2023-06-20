<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Tutor;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Symfony\Component\HttpFoundation\Response;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $userType = $request->input('user_type');

        $request->validate([
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'email' =>
                'required|string|email|max:255|unique:students|unique:tutors',
            'password' => [
                'required',
                'string',
                'confirmed',
                Rules\Password::defaults(),
            ],
            'birth_date' => 'required|date',
            'gender' => 'required|integer|min:0|max:2',
        ]);

        switch ($userType) {
            case 'student':
                $request->validate([
                    'high_school' => 'required|string|max:255',
                    'first_choice_university' => 'required|string|max:255',
                    'first_choice_faculty' => 'required|string|max:255',
                ]);
                $user = Student::create([
                    'last_name' => $request->last_name,
                    'first_name' => $request->first_name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'high_school' => $request->high_school,
                    'first_choice_university' =>
                        $request->first_choice_university,
                    'first_choice_faculty' => $request->first_choice_faculty,
                    'birth_date' => $request->birth_date,
                    'gender' => $request->gender,
                ]);
                break;

            case 'tutor':
                $request->validate([
                    'university' => 'required|string|max:255',
                    'faculty' => 'required|string|max:255',
                ]);
                $user = Tutor::create([
                    'last_name' => $request->last_name,
                    'first_name' => $request->first_name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'university' => $request->university,
                    'faculty' => $request->faculty,
                    'birth_date' => $request->birth_date,
                    'gender' => $request->gender,
                ]);
                break;

            default:
                return response()->json(
                    ['error' => 'Invalid user type'],
                    Response::HTTP_BAD_REQUEST
                );
        }

        event(new Registered($user));

        $guard = Auth::guard($userType . 's');

        $guard->login($user);

        return $user;
    }
}
