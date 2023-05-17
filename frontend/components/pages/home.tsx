import { useAuth } from '@/hooks/auth'
import {Grid} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import axios from "@/lib/axios";
import {Middleware, StudentQuestion} from "@/types";
import DefaultLayout from "@/components/DefaultLayout";
import CardMessage from "@/components/CardMessage";

type Props = {
  middleware: Middleware;
}

const Home = (props: Props) => {
  const { user } = useAuth({ middleware: props.middleware })

  const [questions, setQuestions] = useState<Array<StudentQuestion>>([]);

  useEffect(() => {
    axios.get<StudentQuestion[]>('/api/questions').then(
      result => setQuestions(result.data)
    )
  }, [])

  return (
    <>
      <DefaultLayout middleware={props.middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid xs={12}>
          <h2 style={{color: "white", textAlign: "center"}}>{user?.last_name}さん、こんにちは！</h2>
        </Grid>
        <Grid xs={12} md={10}>
          {questions.map(x =>
            <CardMessage key={x.id} text={(() => {
              if(x.tutor_answers.length == 0 && x.student_comments.length == 0) {
                return x.content;
              } else if (x.tutor_answers.length == 0) {
                return x.student_comments[0].content;
              } else if (x.student_comments.length == 0) {
                return x.tutor_answers[0].content;
              } else {
                return x.tutor_answers[0].created_at > x.student_comments[0].created_at ? x.tutor_answers[0].content : x.student_comments[0].content;
              }
            })()
            } href={`${props.middleware}/chat/${x.id}`} />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Home
