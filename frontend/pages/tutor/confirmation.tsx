import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid, Button, Modal, Box, Typography} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import MiddleButton from "@/components/MiddleButton";
import QuestionContext from "@/components/QuestionContext";
import ModalButton from "@/components/ModalButton";
import { useRouter } from 'next/router';

const Confirmation: NextPage = () => {
  const router = useRouter()
  const middleware = "tutor"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <h1 style={{color: "white", margin: 0}}>質問内容</h1>
        <QuestionContext content={"画像の問題について質問です"}　/>
        <h1 style={{color: "white", textAlign: "center", marginBottom: 0}}>質問者：高島さん</h1>
        <h1 style={{color: "white", textAlign: "center", margin: 0}}>志望大学：東京大学</h1>
        <BackButton />
        <ModalButton
          firstbuttontext={"質問を取得する"}
          modaltext={"一度質問を取得すると、取り消すことができません"}
          finalbuttontext={"取得する"}
          clickHandler={() => {router.push(`/${middleware}/chat`)}}
        />
      </Grid>
    </>
  )
}

export default Confirmation;