import type { NextPage } from 'next'
import * as ChatComponent from "@/components/Pages/Chat";
import MiddleButton from '@/components/MiddleButton';
import BackButton from '@/components/BackButton';
import {Grid} from "@mui/material";

const Chat: NextPage = () => {

  return (
    <>
      <ChatComponent.default middleware={"student"} />
      <Grid container justifyContent="center" spacing={1} marginTop={1} marginBottom={1}>
        <Grid item xs={4} md={2}>
          <BackButton />
        </Grid>
        <Grid item xs={4} md={2}>
          <MiddleButton text={"質問を取り消す"} href={""} />
        </Grid>
        <Grid item xs={4} md={2}>
          <MiddleButton text={"追加で質問する"} href={"select-tutor"} />
        </Grid>
        <Grid item xs={8} md={2}>
          <MiddleButton text={"質問を終了する"} href={"student"} />
        </Grid>
      </Grid>
    </>
  )
}

export default Chat