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

const SelectTutor: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <LargeButton text={"質問する講師を選択"} href={"tutors"} />
        <LargeButton text={"講師を選択しないで質問"} href={"confirmation"} />
        <BackButton />
      </Grid>


    </>
  )
}

export default SelectTutor