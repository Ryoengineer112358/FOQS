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

const CreateQuestion: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const newQuestion = useSelector((state: State) => state.newQuestion)
  const dispatch = useAppDispatch()
  
  const onChangeQuestionContent = (value: string) => {
    dispatch(setContent(value));
  }

  useEffect(() => {
    const quetionContent = localStorage.getItem("questionContent") || ""
    dispatch(setContent(quetionContent !== "null" ? quetionContent : ""))
  }, []);

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center" marginBottom={3}>
        <Grid item xs={12} md={8} marginBottom={2}>
          <Textarea
            value={newQuestion?.content ?? ""}
            changeHandler={onChangeQuestionContent}
          />
        </Grid>
        <Grid item container justifyContent="center" spacing={1}>
          <Grid item xs={6} md={2}>
            <BackButton />
          </Grid>
          <Grid item xs={6} md={2}>
            <MiddleButton
              text={"次へ"}
              onClickHandler={() => dispatch(setContent(newQuestion?.content))}
              href={( newQuestion?.tutorId ) ? "confirmation" : "tutor-option"}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateQuestion