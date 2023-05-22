import * as React from 'react';
import Box from '@mui/material/Box';

type Props = {
  content: string,
  name: string | null,
  university: string | null,
  faculty: string | null,
}

const QuestionContent = ({ content, name, university, faculty }: Props) => {
  const tutorInfo = (name && university && faculty) 
    ? `${name}先生（${university}${faculty}）` 
    : "なし（フリーで質問）";

  return (
    <>
      <h1 style={{color: "white", textAlign: "center", margin: 0}}>質問内容</h1>
      <Box
        sx={{
          height: 360,
          p: 1,
          backgroundColor: 'primary.main',
          borderRadius: 8,
        }}
      >
        {content}
      </Box>
      <h1 style={{color: "white", textAlign: "center", marginBottom: 0}}>質問講師</h1>
      <h2 style={{color: "white", textAlign: "center", margin: 0}}>
        {tutorInfo}
      </h2>
    </>
  );
}

export default QuestionContent;
