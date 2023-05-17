import type { NextPage } from 'next'
import * as ChatComponent from "@/components/Pages/Chat";
import MiddleButton from '@/components/MiddleButton';
import BackButton from '@/components/BackButton';
import {Grid} from "@mui/material";
import { useRouter } from "next/router";
import axios from '@/lib/axios';

const Chat: NextPage = () => {
  const router = useRouter()
  const { query, isReady } = router
  const questionId = query["question-id"]

  const handleSolveQuestion = async () => {
    try {
      isReady && await axios.post(`/api/questions/${questionId}/solve`)
      router.push("/student")
    } catch (err) {
      console.log(err)
    }
  }

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
          <MiddleButton text={"質問を終了する"} href={"student"} onClickHandler={handleSolveQuestion}/>
        </Grid>
      </Grid>
    </>
  )
}

export default Chat