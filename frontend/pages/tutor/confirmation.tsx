import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid, Button, Modal, Box, Typography} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import MiddleButton from "@/components/MiddleButton";
import QuestionContent from "@/components/QuestionContent";
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
        <Grid item xs={12} sm={10} md={8}>
          <QuestionContent
            content={"画像の問題について質問です"}
            student_name={"高島"}
            first_choice_university={"東京大学"}
            first_choice_faculty={"文科Ⅲ類"}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent='center' marginTop={3}>
        <Grid item xs={8} sm={6} md={4}>
          <ModalButton
            firstbuttontext={"質問を取得する"}
            modaltext={"一度質問を取得すると、取り消すことができません"}
            finalbuttontext={"取得する"}
            clickHandler={() => {router.push(`/${middleware}/chat`)}}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent='center' marginTop={2} marginBottom={3}>
        <Grid item xs={6} sm={4} md={2}>
          <BackButton />
        </Grid>
      </Grid>
    </>
  )
}

export default Confirmation;