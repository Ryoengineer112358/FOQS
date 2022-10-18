import {Button} from "@mui/material";
import Link from 'next/link';

type Props = {
  text: string;
  href: string;
};

const LargeButton = (props: Props) => {

  return (
    <>
      <Link href={props.href}>
      <Button
        variant="outlined"
        sx={{
          mt: 2,
          mb: 1,
          width: 320,
          height: 100,
          borderRadius: 100,
        }}
      >
        {props.text}
      </Button>
      </Link>
    </>
  )
}

export default LargeButton;