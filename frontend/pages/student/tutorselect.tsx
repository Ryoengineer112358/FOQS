import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import BackButton from "../../components/backButton";
import Textarea from "../../components/textarea";
import MiddleButton from "../../components/middleButton";

const TutorSelect: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <BackButton />
        <MiddleButton text={"確認"} href={""}/>
      </Grid>


    </>
  )
}

export default TutorSelect