import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import BackButton from "../../components/backButton";import LargeButton from "../../components/largeButton";
import Tutor from "../../components/tutor";
import HomeButton from "../../components/homeButton";
import Profile from "../../components/profile";

const TutorProfile: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
　　    <Profile name={"高島良平"} university={"東京大学大学院"}　/>
        <BackButton />
        <HomeButton />
      </Grid>


    </>
  )
}

export default TutorProfile