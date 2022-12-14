import * as React from 'react';
import Box from '@mui/material/Box';

type Props = {
  context: string,
}

const QuestionContext = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          width: 360,
          height: 300,
          p: 1,
          backgroundColor: 'primary.main',
          borderRadius: 8,
        }}
      >
        {props.context}
      </Box>
    </>
  );
}

export default QuestionContext;
