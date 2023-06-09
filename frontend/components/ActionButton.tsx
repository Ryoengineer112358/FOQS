import {Button} from "@mui/material";

type Props = {
  text: string;
  onClickHandler: Function;
};

const ActionButton = (props: Props) => {

    return (
      <>
          <Button
            onClick={() => props.onClickHandler()}
            variant="outlined"
            sx={{
              width: '100%',
              height: 80,
              borderRadius: 100,
            }}
          >
              {props.text}
          </Button>
      </>
    )
}

export default ActionButton;