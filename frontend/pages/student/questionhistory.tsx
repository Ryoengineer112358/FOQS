import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid, AppBar, Button, Box, Stack} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import LargeButton from "../../components/largeButton";
import BackButton from "../../components/backButton";
import Textarea from "../../components/textarea";
import CardMessage from "../../components/cardMessage";

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
          <CardMessage text="画像の問題について質問です" href={""}/>
          <CardMessage text="画像の問題について質問です" href={""}/>
          <CardMessage text="画像の問題について質問です" href={""}/>
          <CardMessage text="画像の問題について質問です" href={""}/>
          <CardMessage text="画像の問題について質問です" href={""}/>
          <CardMessage text="画像の問題について質問です" href={""}/>
        </Grid>
      </Grid>


    </>
  )
}

export default QuestionHistory