import {Button} from "@mui/material";

const HomeButton = () => {

  return (
    <>
      <Button
        variant="contained"
        href="/student"
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
    </>
  )
}

export default HomeButton;