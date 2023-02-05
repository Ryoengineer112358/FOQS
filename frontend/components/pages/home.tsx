import { useAuth } from '@/hooks/auth'
import {Grid} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import axios from "@/lib/axios";
import {Middleware, StudentQuestion} from "@/types";
import DefaultLayout from "@/components/defaultLayout";
import CardMessage from "@/components/cardMessage";

type Props = {
  middleware: Middleware;
}

const Home = (props: Props) => {
  const { user } = useAuth({ middleware: props.middleware })

  const [questions, setQuestions] = useState<Array<StudentQuestion>>([]);

  useEffect(() => {
    axios.get('/api/questions').then(
      (result) => setQuestions( result.data.map((x: StudentQuestion) => x))
    )
  }, [])

  return (
    <>
      <DefaultLayout middleware={props.middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <h2 style={{color: "white",}}>{user?.last_name}さん、こんにちは！</h2>
        <Grid xs={12}>
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