import { useAuth } from '../hooks/auth'
import type { NextPage } from 'next'
import {AppBar, Button, Box} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import DefaultLayout from "../components/defaultLayout";

const Home: NextPage = () => {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <>
      <DefaultLayout header="">
        <div></div>
      </DefaultLayout>
    </>
  )
}

export default Home
