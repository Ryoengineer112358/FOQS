import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {AppBar, Button, Box, Stack, TextareaAutosize} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import DrawerAppBar from "../../components/drawerAppBar";
import LargeButton from "../../components/largeButton";

const Question: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <DrawerAppBar></DrawerAppBar>
      <TextareaAutosize
        maxRows={4}
        aria-label="maximum height"
        placeholder="Maximum 4 rows"
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua."
        style={{ width: 200 }}
      />
    </>
  )
}

export default Question