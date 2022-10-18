import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import BackButton from "../../components/backButton";
import LargeButton from "../../components/largeButton";
import Tutor from "../../components/tutor";
import MiddleButton from "../../components/middleButton";
import Profile from "../../components/profile";
import QuestionContext from "../../components/questionContext";

const Confirmation: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <h1 style={{color: "white", margin: 0}}>質問内容</h1>
        <QuestionContext context={"画像の問題について質問です"}　/>
        <h1 style={{color: "white", textAlign: "center", marginBottom: 0}}>質問講師</h1>
        <h2 style={{color: "white", textAlign: "center", margin: 0}}>五嶋先生(京都大学法学部)</h2>
      </Grid>
      <BackButton />
      <MiddleButton text={"質問する"} href={""} />
    </>
  )
}

export default Confirmation