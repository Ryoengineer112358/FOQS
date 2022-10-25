import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid, Button, Modal, Box, Typography} from "@mui/material";
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import BackButton from "../../components/backButton";
import MiddleButton from "../../components/middleButton";
import QuestionContext from "../../components/questionContext";
import ModalButton from "../../components/modalButton";

const Confirmation: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <h1 style={{color: "white", margin: 0}}>質問内容</h1>
        <QuestionContext context={"画像の問題について質問です"}　/>
        <h1 style={{color: "white", textAlign: "center", marginBottom: 0}}>質問者：高島さん</h1>
        <h1 style={{color: "white", textAlign: "center", margin: 0}}>志望大学：東京大学</h1>
        <BackButton />
        <ModalButton />
      </Grid>
    </>
  )
}

export default Confirmation;