import * as React from 'react';
import Box from '@mui/material/Box';
import { State } from "@/store"
import { useSelector } from 'react-redux';

type Props = {
  text: string,
  images: string[],
  tutor_id?: number | null,
  student_name?: string | null,
  first_choice_university?: string | null,
  first_choice_faculty?: string | null,
}

const QuestionContent = ({
  text,
  images,
  tutor_id,
  student_name,
  first_choice_university,
  first_choice_faculty
}: Props) => {

  const tutors = useSelector((state: State) => state.tutors);
  const selectedTutor = tutor_id
    ? tutors.find(t => t.id == tutor_id)
    : null;

  const tutorInfo = tutors.length === 0
    ? ""
    : (
      selectedTutor  
      ? `${selectedTutor.last_name}先生（${selectedTutor.university}${selectedTutor.faculty}）` 
      : "なし（フリーで質問）"
    );

  const studentInfo = (student_name && first_choice_university && first_choice_faculty)
    ? `${student_name}さん（${first_choice_university}${first_choice_faculty}志望）`
    : "";

  return (
    <>
      <h1 style={{color: "white", textAlign: "center", margin: 0 }}>質問内容</h1>
      <Box
        sx={{
          marginTop: '8px',
          marginBottom: '8px',
          minHeight: '5rem',
          height: 'auto',
          p: 1,
          backgroundColor: 'primary.main',
          borderRadius: 6,
        }}
      >
        {text}
      </Box>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index}`} style={{width: '100%', marginTop: '15px'}} />
      ))}
      <h1 style={{color: "white", textAlign: "center", marginBottom: 0}}>
        {tutors.length === 0
          ? ""
          : student_name
            ? "質問した生徒"
            : "質問する講師"
        }
      </h1>
      <h2 style={{color: "white", textAlign: "center", margin: 0}}>
        {student_name ? studentInfo : tutorInfo}
      </h2>
    </>
  );
}

export default QuestionContent;
