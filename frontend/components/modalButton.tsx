import * as React from 'react';
import {Box, Button, Typography, Modal, Grid} from '@mui/material';
import Link from "next/link";

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '35%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 360,
//   borderRadius: 6,
//   bgcolor: 'background.paper',
//   border: '2px solid #ffffff',
//   boxShadow: 24,
//   p: 4,
// };

type Props = {
  firstbuttontext: string;
  modaltext: string;
  finalbuttontext: string;
  clickHandler: Function;
}

const ModalButton = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          mt: 3,
          mr: 1,
          ml: 1,
          width: 160,
          height: 80,
          borderRadius: 100,
        }}
      >
        {props.firstbuttontext}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 360,
            borderRadius: 6,
            bgcolor: 'background.paper',
            border: '2px solid #ffffff',
            boxShadow: 24,
            p: 4,
          }}>
          <Typography >
            {props.modaltext}
          </Typography>
          <Grid container justifyContent="center">
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                mt: 4,
                mr: 1,
                ml: 1,
                width: 120,
                height: 60,
                borderRadius: 100,
                color: '#000000',
                border: '2px solid #000000',
                textAlign: "center",
              }}
            >
              戻る
            </Button>
              <Button
                onClick={() => props.clickHandler()}
                variant="outlined"
                sx={{
                  mt: 4,
                  mr: 1,
                  ml: 1,
                  width: 120,
                  height: 60,
                  borderRadius: 100,
                  color: 'white',
                  border: '2px solid #000000',
                  textAlign: "center",
                  backgroundColor: "red"
                  // backgroundColor: "#85e14b"
                }}
              >
                {props.finalbuttontext}
              </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalButton;