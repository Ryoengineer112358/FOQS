import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import Textarea from "@/components/Textarea";
import MiddleButton from "@/components/MiddleButton";
import {useAppDispatch} from "@/store";
import {setContent} from "@/store/modules/newQuestion";
import {useSelector} from 'react-redux';
import {State} from "@/store"

const Question: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const [ questionContent, setQuestionContent ] = useState("");
  const newQuestion = useSelector((state: State) => state.newQuestion)
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
        <MiddleButton
          text={"次へ"}
          onClickHandler={() => dispatch(setContent(questionContent))}
          href={( newQuestion?.tutorId ) ? "select-tutor" : "confirmation"}
        />
      </Grid>
    </>
  )
}

export default Question