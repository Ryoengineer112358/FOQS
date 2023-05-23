import * as React from 'react';
import Box from '@mui/material/Box';
import { Student, Tutor, isStudent, isTutor} from '@/types';

type Props = Student | Tutor

const UserInfo = (props: Props) => {
  const birthDate = new Date(props.birth_date)
  const birthDateString = birthDate.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let genderString = '';
  switch (props.gender) {
    case 0:
      genderString = '男';
      break;
    case 1:
      genderString = '女';
      break;
    case 2:
      genderString = 'その他';
      break;
    default:
      break;
  }
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: 'primary.main',
        borderRadius: 8,
      }}
    >
      名前：{props.last_name} {props.first_name}
      <br />
      メールアドレス：{props.email}
      <br />
        {isStudent(props) &&
          <>
            高校：{props.high_school}
            <br />
            第一志望大学：{props.first_choice_university}
            <br />
            第一志望学部：{props.first_choice_faculty}
          </>
        }
        {isTutor(props) &&
          <>
            大学：{props.university}
            <br />
            学部：{props.faculty}
          </>
        }
      <br />
      生年月日：{birthDateString}
      <br />
      性別：{genderString}
      <br />
    </Box>
  );
}

export default UserInfo;
