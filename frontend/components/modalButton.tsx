import * as React from 'react';
import {Box, Button, Typography, Modal, Grid} from '@mui/material';
import Link from "next/link";

const style = {
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
};

const ModalButton = () => {
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
        質問する
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
            規約事項を守って質問を行ってください
            <br />
            質問は取り消すことができません
          </Typography>
          <Grid container justifyContent="center">
            <Link href="/student">
              <Button
                variant="outlined"
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
                質問を行う
              </Button>
            </Link>
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
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalButton;