import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {AppBar, Button, Box, Stack} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import LargeButton from "../../components/largeButton";

const Home: NextPage = () => {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <>
      <DefaultLayout header="">
        <div></div>
      </DefaultLayout>
        <p>{user?.name}さん、こんにちは</p>
        <LargeButton text="質問履歴"/>
        <LargeButton text="質問する"/>
    </>
  )
}

export default Home
