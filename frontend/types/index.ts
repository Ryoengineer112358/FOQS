export type Middleware = "student" | "tutor" | "guest"

export interface StudentQuestion {
  id: number,
  content: string,
  student_id: number,
  tutor_id?: number,
  tutor_answers: TutorAnswer[],
  student_comments: StudentComment[],
  created_at: Date,
  updated_at: Date,
}
export function isStudentQuestion(arg: any): arg is StudentQuestion {
  return arg.student_id !== undefined;
}

export interface TutorAnswer {
  id: number,
  content: string,
  tutor_id: number,
  student_question_id: number,
  created_at: Date,
  updated_at: Date,
  sender_role: "tutor" | "student",
}
export function isTutorAnswer(arg: any): arg is StudentQuestion {
  return arg.student_question_id !== undefined && arg.sender_role == "tutor";
}

export interface StudentComment {
  id: number,
  content: string,
  student_question_id: number,
  tutor_id: number,
  created_at: Date,
  updated_at: Date,
  sender_role: "tutor" | "student",
}
export function isStudentComment(arg: any): arg is StudentQuestion {
  return arg.student_question_id !== undefined && arg.sender_role == "student";
}

export interface Tutor {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  university: string,
  age: number,
  sex: number,
  quit_at?: Date,
  created_at: Date,
  updated_at: Date,
}
export function isTutor(arg: any): arg is Tutor {
  return arg.university !== undefined;
}

export interface Student {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  high_school: string,
  first_choice_university: string,
  age: number,
  sex: number,
  quit_at?: Date,
  created_at: Date,
  updated_at: Date,
}
export function isStudent(arg: any): arg is Student {
  return arg.first_choice_university !== undefined;
}
