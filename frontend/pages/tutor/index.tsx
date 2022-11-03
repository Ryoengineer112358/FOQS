import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {AppBar, Button, Box, Grid} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import CardMessage from "../../components/cardMessage";
import LargeButton from "../../components/largeButton";

const Home: NextPage = () => {
  const middleware = "tutor"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <h2 style={{color: "white",}}>{user?.tutor_name}さん、こんにちは！</h2>
        <Grid xs={12}>
          <CardMessage text="こちらの画像の問題を解いてください" href="tutor/chat" />
          <CardMessage text="画像の問題についてについて質問です" href={""} />
          <CardMessage text="画像の問題についてについて質問です" href={""} />
          <CardMessage text="画像の問題についてについて質問です" href={""} />
        </Grid>
        <LargeButton text="質問を見つける" href="tutor/questions"/>
      </Grid>
    </>
  )
}

export default Home
