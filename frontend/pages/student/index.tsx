import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import Home from "@/components/Pages/Home";
import MiddleButton from "@/components/MiddleButton";

const Top: NextPage = () => {

  return (
    <>
      <Home middleware={"student"} />
      <Grid container justifyContent="center" spacing={1} marginTop={2}>
        <Grid item xs={6} md={3}>
          <MiddleButton text="質問履歴" href="student/question-history"/>
        </Grid>
        <Grid item xs={6} md={3}>
          <MiddleButton text="質問する" href={"student/question"}/>
        </Grid>
      </Grid>
    </>
  )
}

export default Top
