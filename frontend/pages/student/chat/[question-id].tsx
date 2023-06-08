import type { NextPage } from 'next'
import * as ChatComponent from "@/components/Chat";
import MiddleButton from '@/components/MiddleButton';
import BackButton from '@/components/BackButton';
import {Grid, Typography} from "@mui/material";
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
  const [question, setQuestion] = useState<StudentQuestion>({
    ...defaultMessage(),
    student_id: 0,
    tutor_answers: [],
    student_comments: [],
    })
  const [ratingValue, setRatingValue] = useState<number | null>(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isReady) {
      axios.get(`/api/questions/${questionId}`)
      .then(response => setQuestion(response.data))
      .catch(error => error(error))
    }
  }, [isReady, questionId])

  const handleSolveQuestion = async () => {
    if (!ratingValue) {
      setError('評価を入力してください')
      return
    }

    try {
      isReady && await axios.post(`/api/questions/${questionId}/solve`)
      router.push("/student")
    } catch (err) {
      setError('通信エラーが発生しました')
    }
  }

  const handleDeleteQuestion = async () => {
    try {
      isReady && await axios.delete(`/api/questions/${questionId}`)
      router.push("/student")
    } catch (err) {
      setError('通信エラーが発生しました')
    }
  }

  const ratingComponent = (
    <>
      <Rating
        name='rating-tutor'
        size='large'
        sx={{ fontSize: '3rem' }}
        value={ratingValue}
        onChange={(event, newValue: number | null) => {
          setRatingValue(newValue);
          setError(null);
        }}
      />
      {error && (
        <Typography
          variant="body1" 
          align="center" 
          sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'red' }}
        >
          {error}
        </Typography>
      )}
    </>
  )

  return (
    <>
      <ChatComponent.default middleware={"student"} />
      {question.student_id !==0 && (
        <Grid container justifyContent="center" spacing={1} marginTop={2} marginBottom={3}>
          {question && (question.closed_at ? (
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
              <ModalButton
                firstbuttontext='質問を取り消す'
                modaltext={'質問を取り消した場合でも、\nチケットの返却はありません'}
                finalbuttontext='質問を取り消す'
                clickHandler={handleDeleteQuestion}
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <ModalButton
                firstbuttontext='追加で質問する'
                modaltext={"チケットを追加で1枚使うことで、このまま質問を続けることができます\n※講師の本日の質問受付数が上限に達している場合、質問できません"}
                finalbuttontext='追加で質問する'
                clickHandler={() => router.push("/student")}
              />
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item xs={8} sm={6} md={4}>
              <ModalButton
                firstbuttontext='質問を終了する'
                modaltext='講師を評価して質問を終了してください'
                finalbuttontext='評価して終了'
                clickHandler={handleSolveQuestion}
                additionalElement={ratingComponent}
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