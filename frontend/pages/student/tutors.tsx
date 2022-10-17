import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import BackButton from "../../components/backButton";import LargeButton from "../../components/largeButton";
import Tutor from "../../components/tutor";
import HomeButton from "../../components/homeButton";

const Tutors: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid xs={12}>
          <Tutor text={"高島先生(東京大学大学院教養学部)"} href={"tutorprofile"} />
          <Tutor text={"五嶋先生(京都大学法学部)"} href={""} />
          <Tutor text={"須田先生(東京大学法学部)"} href={""} />
        </Grid>
        <BackButton />
        <HomeButton />
      </Grid>


    </>
  )
}

export default Tutors