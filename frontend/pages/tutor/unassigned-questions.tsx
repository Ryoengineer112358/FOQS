import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import { Grid } from '@mui/material'
import * as React from 'react'
import DefaultLayout from '@/components/DefaultLayout'
import CardMessage from '@/components/CardMessage'
import { useEffect, useState } from 'react'
import { StudentQuestion } from '@/types'
import axios from '@/lib/axios'
import LinkButton from '@/components/LinkButton'

const UnassignedQuestions: NextPage = () => {
  const middleware = 'tutor'
  const { user } = useAuth({ middleware: middleware })
  const [questions, setQuestions] = useState<Array<StudentQuestion>>([])

  useEffect(() => {
    axios
      .get<StudentQuestion[]>('/api/unassigned-questions')
      .then((response) => setQuestions(response.data))
  }, [])

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={10} md={8}>
          {questions.map((x) => (
            <CardMessage
              key={x.id}
              text={x.text}
              href={`confirm-question/${x.id}`}
            />
          ))}
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <Grid item xs={6} sm={4} md={3} marginTop={2} marginBottom={3}>
          <LinkButton text={'ホームに戻る'} href={'/tutor'} />
        </Grid>
      </Grid>
    </>
  )
}

export default UnassignedQuestions
