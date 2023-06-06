import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import DefaultLayout from "@/components/DefaultLayout";
import CardMessage from "@/components/CardMessage";
import {useEffect, useState} from "react";
import {StudentQuestion} from "@/types";
import axios from "@/lib/axios";
import MiddleButton from '@/components/MiddleButton';

const QuestionHistory: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const [questions, setQuestions] = useState<Array<StudentQuestion>>([]);

  useEffect(() => {
    axios.get<StudentQuestion[]>('/api/questions?solved_only=true').then(
      result => setQuestions(result.data)
    )
  }, [])

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          {questions.map(x =>
            <CardMessage key={x.id} text={x.text} href={`/${middleware}/chat/${x.id}`} />
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={6} sm={4} md={3} lg={2} marginTop={2} marginBottom={3}>
          <MiddleButton text="ホームに戻る" href={`/${middleware}`} />
        </Grid>
      </Grid>
    </>
  )
}

export default QuestionHistory