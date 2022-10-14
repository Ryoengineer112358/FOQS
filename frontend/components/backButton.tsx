import {Button} from "@mui/material";
import {ReactElement} from 'react'
import {TurnLeft} from "@mui/icons-material";

type Props = {
  text: string;
  href: string;
};

const BackButton = (props: Props) => {

  return (
    <>
      <Button
        startIcon={<TurnLeft />}
        variant="outlined"
        href={props.href}
        sx={{
          m:1,
          width: 80,
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