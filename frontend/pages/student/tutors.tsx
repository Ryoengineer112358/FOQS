import {useAuth} from '@/hooks/auth'
import type {NextPage} from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import {useSelector} from 'react-redux'
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import Tutor from "@/components/Tutor";
import {State} from "@/store"

const Tutors: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const tutors = useSelector((state: State) => state.tutors)

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          {tutors.map(t =>
            <Tutor key={t.id} text={`${t.university}${t.faculty} ${t.last_name}先生`} href={`tutor-profile/${t.id}`} />
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent="center" marginTop={3} marginBottom={3}>
        <Grid item xs={6} md={4}>
          <BackButton />
        </Grid>
      </Grid>
    </>
  )
}

export default Tutors