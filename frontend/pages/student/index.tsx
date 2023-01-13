import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import Home from "@/components/pages/home";
import MiddleButton from "@/components/middleButton";

const Top: NextPage = () => {

  return (
    <>
      <Home middleware={"student"} />
      <Grid container justifyContent="center">
        <MiddleButton text="質問履歴" href="student/questionhistory"/>
        <MiddleButton text="質問する" href={"student/question"}/>
      </Grid>
    </>
  )
}

export default Top
