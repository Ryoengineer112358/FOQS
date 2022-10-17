import {Button} from "@mui/material";

type Props = {
  text: string;
  href: string;
};

const LargeButton = (props: Props) => {

  return (
    <>
      <Button
        variant="outlined"
        href={props.href}
        sx={{
          mt: 3,
          width: 320,
          height: 100,
          borderRadius: 100,
        }}
      >
        {props.text}
      </Button>
    </>
  )
}

export default LargeButton;