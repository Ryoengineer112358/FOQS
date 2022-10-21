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
}

export interface StudentComment {
  id: number,
  content: string,
  student_question_id: number,
  tutor_id: number,
  created_at: Date,
  updated_at: Date,
}

