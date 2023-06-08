import type { NextPage } from 'next'
import * as ChatComponent from "@/components/Pages/Chat";
import BackButton from '@/components/BackButton';
import {Grid, Typography} from "@mui/material";
import { useRouter } from "next/router";
import axios from '@/lib/axios';
import { useState, useEffect } from 'react';
import type { StudentQuestion } from '@/types';
import { defaultMessage } from '@/types';
import ModalButton from "@/components/ModalButton";

const Chat: NextPage = () => {
  const router = useRouter()
  const { query, isReady } = router
  const questionId = query["question-id"]
  const [question, setQuestion] = useState<StudentQuestion>({
    ...defaultMessage(),
    student_id: 0,
    tutor_answers: [],
    student_comments: [],
    })
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (isReady) {
      axios.get(`/api/questions/${questionId}`)
      .then(response => setQuestion(response.data))
      .catch(error => error(error))
    }
  }, [isReady, questionId])

  return (
    <>
      <ChatComponent.default middleware={"tutor"} />
      {question.student_id !==0 && (
        <Grid container justifyContent="center" spacing={1} marginTop={2} marginBottom={3}>
          {question && (question.closed_at ? (
            <>
              <Grid item xs={6} sm={4} md={3}>
                <BackButton />
              </Grid>
            </>
          ) : (
            <>
          <Grid item container justifyContent="center" spacing={1} marginTop={1} marginBottom={1}>
            <Grid item xs={5} sm={4} md={3}>
              <ModalButton
                firstbuttontext='回答を放棄する'
                modaltext={'回答を放棄する場合も、生徒から評価が行われます\n質問に答えられない理由や、生徒が取るべき次のアクションを伝えた後に放棄することを推奨します'}
                finalbuttontext='回答を放棄する'
                clickHandler={() => router.push("/tutor")}
              />
            </Grid>
            <Grid item xs={5} sm={4} md={3}>
              <ModalButton
                firstbuttontext='追加のチケットを要求する'
                modaltext={"生徒からチケット1枚分を超える質問がされた場合、追加チケットの要求が可能です\n※ガイドラインを遵守し、ルール違反となる形でのチケット追加要求は行わないでください"}
                finalbuttontext='追加で質問する'
                clickHandler={() => router.push("/tutor")}
              />
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item xs={6} sm={6} md={4}>
              <BackButton />
            </Grid>
          </Grid>
          </>
          ))}
        </Grid>
      )}
    </>
  )
}

export default Chat