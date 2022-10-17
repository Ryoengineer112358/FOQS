import {Button} from "@mui/material";
import {ReactElement} from 'react'
import {TurnLeft} from "@mui/icons-material";

type Props = {
  text: string;
};

const BackButton = (props: Props) => {

  return (
    <>
      <Button
        startIcon={<TurnLeft />}
        variant="outlined"
        onClick={() => history.back()}
        sx={{
          mt: 3,
          mr: 1,
          ml: 1,
          width: 160,
          height: 80,
          borderRadius: 100,
        }}
      >
        {props.text}
      </Button>
    </>
  )
}

export default BackButton;