import {Button} from "@mui/material";
import Link from 'next/link';

type Props = {
  text: string;
  href: string;
  onClickHandler?: Function;
};

const MiddleButton = (props: Props) => {

    return (
      <>
        <Link href={props.href}>
          <Button
            onClick={() => {if (props.onClickHandler) props.onClickHandler()}}
            variant="outlined"
            sx={{
              width: '100%',
              height: 80,
              borderRadius: 100,
            }}
          >
              {props.text}
          </Button>
        </Link>
      </>
    )
}

export default MiddleButton;