import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/DefaultLayout";
import CardMessage from "@/components/CardMessage";
import HomeButton from "@/components/HomeButton";

const QuestionHistory: NextPage = () => {
  const middleware = "tutor"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid xs={12}>
          <CardMessage text="画像の問題について質問です" href="/tutor/confirmation"/>
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