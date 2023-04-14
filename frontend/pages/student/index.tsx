import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import Home from "@/components/Pages/Home";
import MiddleButton from "@/components/MiddleButton";

const Top: NextPage = () => {

  return (
    <>
      <Home middleware={"student"} />
      <Grid container justifyContent="center">
        <MiddleButton text="質問履歴" href="student/question-history"/>
        <MiddleButton text="質問する" href={"student/question"}/>
      </Grid>
    </>
  )
}

export default Top
