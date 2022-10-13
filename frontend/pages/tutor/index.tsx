import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {AppBar, Button, Box} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";

const Home: NextPage = () => {
  const middleware = "tutor"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
    </>
  )
}

export default Home
