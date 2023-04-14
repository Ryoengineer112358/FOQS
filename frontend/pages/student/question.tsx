import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/defaultLayout";
import BackButton from "@/components/backButton";
import Textarea from "@/components/textarea";
import MiddleButton from "@/components/middleButton";
import {useAppDispatch} from "@/store";
import {setContent} from "@/store/modules/newQuestion";

const Question: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const [ questionContent, setQuestionContent ] = useState("");
  const dispatch = useAppDispatch()
  useEffect(() => {
    setQuestionContent(localStorage.getItem("questionContent") ?? "")
  }, []);

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Textarea
          value={questionContent}
          changeHandler={(value: string) => {
            setQuestionContent(value);
            localStorage.setItem("questionContent", value)
          }}
        />
        <BackButton />
        <MiddleButton text={"次へ"} href={"select-tutor"} onClickHandler={() => dispatch(setContent(questionContent))}/>
      </Grid>
    </>
  )
}

export default Question