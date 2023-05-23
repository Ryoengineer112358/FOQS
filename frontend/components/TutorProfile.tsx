import * as React from 'react';
import Box from '@mui/material/Box';

type Props = {
  name: string
  university: string
  faculty: string
}

const TutorProfile = (props: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        backgroundColor: 'primary.main',
        borderRadius: 8,
      }}
    >
    名前：{props.name} 先生
    <br />
    大学：{props.university}
    <br />
    学部：{props.faculty}
    </Box>
  );
}

export default TutorProfile;