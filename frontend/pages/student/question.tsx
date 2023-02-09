import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import { useState } from "react";
import DefaultLayout from "@/components/defaultLayout";
import BackButton from "@/components/backButton";
import Textarea from "@/components/textarea";
import MiddleButton from "@/components/middleButton";
import {State, useAppDispatch} from "@/store";
import {update} from "@/store/modules/newQuestion";
import {useSelector} from "react-redux";

const Question: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const [ questionContent, setQuestionContent ] = useState("");
  const dispatch = useAppDispatch()

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Textarea value={questionContent} changeHandler={setQuestionContent}/>
        <BackButton />
        <MiddleButton text={"次へ"} href={"tutorselect"} onClickHandler={() => dispatch(update({content: questionContent}))}/>
      </Grid>


    </>
  )
}

export default Question