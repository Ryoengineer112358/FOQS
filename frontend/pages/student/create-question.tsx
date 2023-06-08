import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import QuestionInputArea from "@/components/QuestionInputArea";
import LinkButton from "@/components/LinkButton";
import {useAppDispatch} from "@/store";
import {setText, setImages} from "@/store/modules/newQuestion";
import {useSelector} from 'react-redux';
import {State} from "@/store"

const CreateQuestion: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const newQuestion = useSelector((state: State) => state.newQuestion)
  const dispatch = useAppDispatch()
  
  const onChangeQuestionContent = (value: string) => {
    dispatch(setText(value));
  }

  const onChangeQuestionImages = (value: string[]) => {
    dispatch(setImages(value));
  }

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center" marginBottom={3}>
        <Grid item xs={12} md={8} marginBottom={2}>
          <QuestionInputArea
            text={newQuestion?.text ?? ""}
            images={newQuestion?.images ?? []}
            textChangeHandler={onChangeQuestionContent}
            imagesChangeHandler={onChangeQuestionImages}
          />
        </Grid>
        <Grid item container justifyContent="center" spacing={1}>
          <Grid item xs={6} md={2}>
            <BackButton />
          </Grid>
          <Grid item xs={6} md={2}>
            <LinkButton
              text={"次へ"}
              href={( newQuestion?.tutorId ) ? "confirmation" : "tutor-option"}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateQuestion
