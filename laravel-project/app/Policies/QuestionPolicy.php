<?php

namespace App\Policies;

use App\Models\Student;
use App\Models\StudentQuestion;
use App\Models\Tutor;
use Auth;
use Illuminate\Auth\Access\HandlesAuthorization;

class QuestionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\Student  $student
     * @param  \App\Models\StudentQuestion  $studentQuestion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(Student | Tutor $student, StudentQuestion $studentQuestion)
    {
        return (Auth::guard('students')->check() && $studentQuestion->student_id == Auth::id())
            || (Auth::guard('tutors')->check() && $studentQuestion->tutor_id == Auth::id());
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(Student | Tutor $student)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\Student  $student
     * @param  \App\Models\StudentQuestion  $studentQuestion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(Student | Tutor $student, StudentQuestion $studentQuestion)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\Student  $student
     * @param  \App\Models\StudentQuestion  $studentQuestion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(Student | Tutor $student, StudentQuestion $studentQuestion)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\Student  $student
     * @param  \App\Models\StudentQuestion  $studentQuestion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(Student | Tutor $student, StudentQuestion $studentQuestion)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\Student  $student
     * @param  \App\Models\StudentQuestion  $studentQuestion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(Student | Tutor $student, StudentQuestion $studentQuestion)
    {
        //
    }
}
