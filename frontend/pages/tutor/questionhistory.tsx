import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import CardMessage from "../../components/cardMessage";
import HomeButton from "../../components/homeButton";

const QuestionHistory: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid xs={12}>
          <CardMessage text="画像の問題について質問です" href="/"/>
          <CardMessage text="画像の問題について質問です" href={""}/>
          <CardMessage text="画像の問題について質問です" href={""}/>
          <CardMessage text="画像の問題について質問です" href={""}/>
          <CardMessage text="画像の問題について質問です" href={""}/>
        </Grid>
      </Grid>
      <Grid container justifyContent="right">
        <HomeButton href={"/tutor"} />
      </Grid>
    </>
  )
}

export default QuestionHistory