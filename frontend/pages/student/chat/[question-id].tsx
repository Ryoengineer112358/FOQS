import type { NextPage } from 'next'
import * as ChatComponent from "@/components/Pages/Chat";
import MiddleButton from '@/components/MiddleButton';
import BackButton from '@/components/BackButton';
import {Grid} from "@mui/material";
import { useRouter } from "next/router";
import axios from '@/lib/axios';
import { useState, useEffect } from 'react';
import type { StudentQuestion } from '@/types';
import { defaultMessage } from '@/types';
import ModalButton from "@/components/ModalButton";
import Rating from '@mui/material/Rating';

const Chat: NextPage = () => {
  const router = useRouter()
  const { query, isReady } = router
  const questionId = query["question-id"]
  const [question, setQuestion] = useState<StudentQuestion>({...defaultMessage, student_id: 0, tutor_answers: [], student_comments: []})
  const [ratingValue, setRatingValue] = useState<number | null>(0)

  useEffect(() => {
    if (isReady) {
      axios.get(`/api/questions/${questionId}`)
      .then(response => setQuestion(response.data))
      .catch(error => error(error))
    }
  }, [isReady, questionId])

  const handleSolveQuestion = async () => {
    if (!ratingValue) {
      alert('評価を入力してください')
      return
    }

    try {
      isReady && await axios.post(`/api/questions/${questionId}/solve`)
      router.push("/student")
    } catch (err) {
      console.log(err)
    }
  }

  const ratingComponent = (
    <Rating
      name='rating-tutor'
      size='large'
      sx={{ fontSize: '3rem' }}
      value={ratingValue}
      onChange={(event, newValue: number | null) => {
        setRatingValue(newValue);
      }}
    />
  )

  return (
    <>
      <ChatComponent.default middleware={"student"} />
      {question.student_id !==0 && (
        <Grid container justifyContent="center" spacing={1} marginTop={2} marginBottom={3}>
          {question && (question.solved_at ? (
            <>
              <Grid item xs={7} sm={5} md={3}>
                <MiddleButton
                  text='この講師にまた質問する'
                  href={`/student/tutor-profile/${question.tutor_id}`}
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <BackButton />
              </Grid>
            </>
          ) : (
            <>
          <Grid item container justifyContent="center" spacing={0.5} marginTop={1} marginBottom={1}>
            <Grid item xs={4} sm={3} md={2}>
              <BackButton />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <MiddleButton text={"質問を取り消す"} href={""} />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <MiddleButton text={"追加で質問する"} href={"select-tutor"} />
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item xs={8} sm={6} md={4}>
              <ModalButton
                firstbuttontext='質問を終了する'
                modaltext='講師を評価して質問を終了してください'
                finalbuttontext='評価して終了'
                clickHandler={handleSolveQuestion}
                ratingComponent={ratingComponent}
              />
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