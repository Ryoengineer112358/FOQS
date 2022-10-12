import {Button} from "@mui/material";
import {ReactElement} from 'react'

type Props = {
  text: string;
};

const LargeButton = (props: Props) => {

    return (
      <>
        <Button
          variant="contained"
          href="#contained-buttons"
          sx={{
            m:1,
            width: 168,
            height: 80,
            borderRadius: 30,
          }}
        >
            {props.text}
        </Button>
      </>
    )
}

export default LargeButton;