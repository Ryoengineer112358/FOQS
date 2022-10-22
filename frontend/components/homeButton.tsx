import {Button} from "@mui/material";
import Link from 'next/link';

type Props = {
  href: string;
}

const HomeButton = (props: Props) => {

  return (
    <>
      <Link href={props.href}>
      <Button
        variant="contained"
        sx={{
          mt: 5,
          mr: 3,
          width: 100,
          height: 50,
          borderRadius: 100,
        }}
      >
        ホーム
      </Button>
      </Link>
    </>
  )
}

export default HomeButton;