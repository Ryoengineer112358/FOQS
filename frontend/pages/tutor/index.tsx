import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import Home from "@/components/Pages/Home";
import MiddleButton from "@/components/MiddleButton";

const Top: NextPage = () => {

  return (
    <>
      <Home middleware={"tutor"} />
      <Grid container justifyContent="center" marginTop={2} marginBottom={3}>
        <Grid item xs={8} sm={6} md={4}>
          <MiddleButton text="質問を見つける" href="tutor/questions"/>
        </Grid>
      </Grid>
    </>

  )
}

export default Top
