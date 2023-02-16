import * as React from 'react';
import Box from '@mui/material/Box';

type Props = {
  name: string;
  property: string;
  university: string;
}

const Profile = (props: Props) => {
  return (
    <Box
      sx={{
        width: 360,
        height: 300,
        p: 2,
        backgroundColor: 'primary.main',
        borderRadius: 8,
      }}
    >
    名前：{props.name}
      <br />
    {props.property}：{props.university}
    </Box>
  );
}

export default Profile;
