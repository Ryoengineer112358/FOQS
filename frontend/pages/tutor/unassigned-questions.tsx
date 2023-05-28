import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/DefaultLayout";
import CardMessage from "@/components/CardMessage";
import HomeButton from "@/components/HomeButton";
import { useEffect, useState } from 'react';
import { StudentQuestion } from '@/types';
import axios from '@/lib/axios';

const UnassignedQuestions: NextPage = () => {
  const middleware = "tutor"
  const { user } = useAuth({ middleware: middleware })
  const [questions, setQuestions] = useState<Array<StudentQuestion>>([])

  useEffect(() => {
    axios.get<StudentQuestion[]>('/api/unassigned-questions')
      .then(response => setQuestions(response.data))
  }, [])

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          {questions.map(x =>
            <CardMessage key={x.id} text={x.content} href={'/tutor'} />)}
        </Grid>
      </Grid>
      <Grid container justifyContent='right'>
        <HomeButton href='/tutor' />
      </Grid>
    </>
  )
}

export default UnassignedQuestions