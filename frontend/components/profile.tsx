import * as React from 'react';
import Box from '@mui/material/Box';

type Props = {
  name: string;
  university: string;
}

const Profile = (props: Props) => {
  return (
    <Box
      sx={{
        width: 360,
        height: 300,
        p: 1,
        backgroundColor: 'primary.main',
        borderRadius: 8,
      }}
    >
    講師名：{props.name}
      <br />
    大学名:{props.university}
    </Box>
  );
}

export default Profile;
