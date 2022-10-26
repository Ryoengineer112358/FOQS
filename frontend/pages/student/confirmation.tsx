import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import {Grid, Button, Modal, Box, Typography} from "@mui/material";
import * as React from "react";
import DefaultLayout from "../../components/defaultLayout";
import BackButton from "../../components/backButton";
import MiddleButton from "../../components/middleButton";
import QuestionContext from "../../components/questionContext";
import ModalButton from "../../components/modalButton";
import { useRouter } from 'next/router';

const Confirmation: NextPage = () => {
  const router = useRouter()
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
        <h1 style={{color: "white", textAlign: "center", marginBottom: 0}}>質問講師</h1>
        <h2 style={{color: "white", textAlign: "center", margin: 0}}>五嶋先生(京都大学法学部)</h2>
        <BackButton />
        <ModalButton
          firstbuttontext={"質問する"}
          modaltext={"規約事項を守って質問を行ってください\n質問は取り消すことができません"}
          finalbuttontext={"質問する"}
          clickHandler={() => {router.push(`/${middleware}`)}}
        />
      </Grid>
    </>
  )
}

export default Confirmation;