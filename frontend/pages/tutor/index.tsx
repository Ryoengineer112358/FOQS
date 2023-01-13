import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import Home from "@/components/pages/home";
import LargeButton from "@/components/largeButton";

const Top: NextPage = () => {

  return (
    <>
      <Home middleware={"tutor"} />
      <Grid container justifyContent="center">
        <LargeButton text="質問を見つける" href="tutor/questions"/>
      </Grid>
    </>

  )
}

export default Top
