import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import Textarea from "@/components/Textarea";
import MiddleButton from "@/components/MiddleButton";
import LargeButton from "@/components/LargeButton";
import HomeButton from "@/components/HomeButton";
import {useAppDispatch} from "@/store";
import {setTutorId} from "@/store/modules/newQuestion";

const TutorOption: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const dispatch = useAppDispatch()

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center" spacing={1} marginTop={1} marginBottom={2}>
        <Grid item xs={10} md={4}>
          <MiddleButton text={"質問する講師を選択"} href={"tutors"} />
        </Grid>
        <Grid item xs={10} md={4}>
          <MiddleButton
            text={"講師を選択しないで質問"}
            onClickHandler={() => dispatch(setTutorId(null))}
            href={"confirmation"} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={6} md={3}>
          <BackButton />
        </Grid>
      </Grid>
    </>
  )
}

export default TutorOption