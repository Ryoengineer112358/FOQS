import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import Home from "@/components/Pages/Home";
import LargeButton from "@/components/LargeButton";

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
