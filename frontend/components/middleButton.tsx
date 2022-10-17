import {Button} from "@mui/material";

type Props = {
  text: string;
  href: string;
};

const MiddleButton = (props: Props) => {

    return (
      <>
        <Button
          variant="outlined"
          href={props.href}
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

export default MiddleButton;