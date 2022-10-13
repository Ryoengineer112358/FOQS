import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid, AppBar, Button, Box, Stack} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import LargeButton from "../../components/largeButton";
import CardMessage from "../../components/cardMessage";

const Home: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
        <h2>{user?.name}さん、こんにちは</h2>
        <Grid container>
          <Grid xs={8}>
            <CardMessage />
            <CardMessage />
            <CardMessage />
            <CardMessage />
            <CardMessage />
          </Grid>
        </Grid>
        <LargeButton text="質問履歴" href={""}/>
        <LargeButton text="質問する" href={""}/>

    </>
  )
}

export default Home
