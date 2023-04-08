<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

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
        $request->validate([
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'string', 'confirmed', Rules\Password::defaults()],
            'high_school' => 'required|string|max:255',
            'first_choice_university' => 'required|string|max:255',
            'first_choice_faculty' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|integer|min:0|max:2',
        ]);

        $user = Student::create([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'high_school' => $request->high_school,
            'first_choice_university' => $request->first_choice_university,
            'first_choice_faculty' => $request->first_choice_faculty,
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }


}
