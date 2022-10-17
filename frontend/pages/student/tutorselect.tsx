import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import BackButton from "../../components/backButton";
import Textarea from "../../components/textarea";
import MiddleButton from "../../components/middleButton";
import LargeButton from "../../components/largeButton";

const TutorSelect: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <LargeButton text={"講師を選択"} href={""} />
        <LargeButton text={"フリーで質問"} href={""} />
        <BackButton />
      </Grid>


    </>
  )
}

export default TutorSelect