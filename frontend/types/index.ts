export type Middleware = "student" | "tutor" | "guest";

export const defaultMessage = {
  id: 0,
      content: '',
      tutor_id: 0,
      student_question_id: 0,
      created_at: new Date(),
      updated_at: new Date(),
}

export type StudentQuestion = {
  id: number,
  content: string,
  student_id: number,
  tutor_id?: number,
  tutor_answers: TutorAnswer[],
  student_comments: StudentComment[],
  solved_at?: Date,
  created_at: Date,
  updated_at: Date,
};
export function isStudentQuestion(arg: any): arg is StudentQuestion {
  return arg.student_id !== undefined;
};

export type TutorAnswer = {
  id: number,
  content: string,
  tutor_id: number,
  student_question_id: number,
  created_at: Date,
  updated_at: Date,
};
export function isTutorAnswer(arg: any): arg is StudentQuestion {
  return arg.student_question_id !== undefined && arg.sender_role == "tutor";
};

export type StudentComment = {
  id: number,
  content: string,
  student_question_id: number,
  tutor_id: number,
  created_at: Date,
  updated_at: Date,
};
export function isStudentComment(arg: any): arg is StudentQuestion {
  return arg.student_question_id !== undefined && arg.sender_role == "student";
};

export type Tutor = {
  id: number,
  last_name: string,
  first_name: string,
  email: string,
  university: string,
  faculty: string,
  birth_date: Date,
  gender: number,
  quit_at?: Date,
  created_at: Date,
  updated_at: Date,
  email_verified_at?: Date,
};
export function isTutor(arg: any): arg is Tutor {
  return arg.university !== undefined;
};

export type Student = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  high_school: string,
  first_choice_university: string,
  first_choice_faculty: string,
  birth_date: Date,
  gender: number,
  quit_at?: Date,
  created_at: Date,
  updated_at: Date,
  email_verified_at?: Date,
};
export function isStudent(arg: any): arg is Student {
  return arg.first_choice_university !== undefined;
};
