export interface StudentQuestion {
  id: number,
  content: string,
  student_id: number,
  tutor_id?: number,
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
  sender_role: string,
}

export interface StudentComment {
  id: number,
  content: string,
  student_question_id: number,
  tutor_id: number,
  created_at: Date,
  updated_at: Date,
  sender_role: string,
}

export interface Tutor {
  id: number,
  name: string,
  email: string,
  university: string,
  age: number,
  sex: number,
  quit_at?: Date,
  created_at: Date,
  updated_at: Date,
}
export function isTutor(arg: any): arg is Tutor {
  return arg.id !== undefined;
}

export interface Student {
  id: number,
  name: string,
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
  return arg.id !== undefined;
}
