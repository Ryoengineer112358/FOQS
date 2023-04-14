import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/DefaultLayout";
import CardMessage from "@/components/CardMessage";
import HomeButton from "@/components/HomeButton";
import {useEffect, useState} from "react";
import {StudentQuestion} from "@/types";
import axios from "@/lib/axios";

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
        <Grid xs={12}>
          {questions.map(x =>
            <CardMessage key={x.id} text={x.content} href={`${middleware}/chat/${x.id}`} />
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent="right">
        <HomeButton href={"/student"}/>
      </Grid>
    </>
  )
}

export default QuestionHistory