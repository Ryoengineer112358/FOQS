import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid, AppBar, Button, Box, Stack} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import CardMessage from "../../components/cardMessage";
import MiddleButton from "../../components/middleButton";

const Home: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
        <Grid container justifyContent="center">
          <h2 style={{color: "white",}}>{user?.name}さん、こんにちは！</h2>
          <Grid xs={12}>
            <CardMessage text="画像の問題についてについて質問です" href="" />
            <CardMessage text="画像の問題についてについて質問です" href={""} />
            <CardMessage text="画像の問題についてについて質問です" href={""} />
            <CardMessage text="画像の問題についてについて質問です" href={""} />
          </Grid>
          <MiddleButton text="質問履歴" href="student/questionhistory"/>
          <MiddleButton text="質問する" href={"student/question"}/>
        </Grid>

    </>
  )
}

export default Home
