import {useAuth} from '../../hooks/auth'
import type {NextPage} from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import {useSelector} from 'react-redux'
import DefaultLayout from "../../components/defaultLayout";
import BackButton from "../../components/backButton";
import Tutor from "../../components/tutor";
import HomeButton from "../../components/homeButton";
import {State} from "../../store"

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
        <Grid xs={12}>
          {tutors.map(t =>
              <Tutor key={t.id} text={`${t.last_name} ${t.first_name}`} href={"tutorprofile"} />
          )}
        </Grid>
        <BackButton />
        <HomeButton href={"/student"} />
      </Grid>
    </>
  )
}

export default Tutors