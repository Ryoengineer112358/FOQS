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
  additionalElement?: React.ReactNode;
}

const ModalButton = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const lines = props.modaltext
    .split('\n')
    .map((line, i) => (
      <p key={i} style={{lineHeight: "1.2"}}>
        {line}
      </p>
    ))

  return (
    <Grid item xs={12}>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          height: 80,
          width: "100%",
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
            textAlign: "center",
            position: 'absolute' as 'absolute',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 360,
            borderRadius: 6,
            bgcolor: 'background.paper',
            border: '2px solid #ffffff',
            boxShadow: 24,
            p: 4,
          }}>
          <Typography sx={{ fontWeight: 600, fontSize: 16}}>
            {lines}
          </Typography>
          {props.additionalElement && props.additionalElement}
          <Grid container justifyContent="center">
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              mt: 2,
              mr: 1,
              ml: 1,
              width: 120,
              height: 60,
              borderRadius: 100,
              color: '#000000',
              border: '1px solid #000000',
              textAlign: "center",
              '&:hover': {
                backgroundColor: '#F5F5F5',
                borderColor: '#000000',
              },
              '&:active': {
                borderColor: '#000000',
                backgroundColor: '#E0E0E0',
              },
              '&:focus': {
                borderColor: '#000000',
              }
            }}
          >
            戻る
          </Button>
          <Button
            onClick={() => props.clickHandler()}
            variant="outlined"
            sx={{
              mt: 2,
              mr: 1,
              ml: 1,
              width: 120,
              height: 60,
              borderRadius: 100,
              color: 'white',
              border: '1px solid #000000',
              textAlign: "center",
              backgroundColor: "red",
              '&:hover': {
                backgroundColor: '#FF3333', 
                borderColor: '#000000',
              },
              '&:active': {
                borderColor: '#000000',
                backgroundColor: '#CC0000',
              },
              '&:focus': {
                borderColor: '#000000',
              }
            }}
          >
            {props.finalbuttontext}
          </Button>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}

export default ModalButton;