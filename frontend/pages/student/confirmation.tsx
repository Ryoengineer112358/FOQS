import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import QuestionContent from "@/components/QuestionContent";
import ModalButton from "@/components/ModalButton";
import MiddleButton from '@/components/MiddleButton';
import { useRouter } from 'next/router';
import {useSelector} from 'react-redux';
import {State, useAppDispatch} from "@/store"
import { clearNewQuestion, submitQuestion } from '@/store/modules/newQuestion';
import { unwrapResult } from '@reduxjs/toolkit';

const Confirmation: NextPage = () => {
  const router = useRouter()
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const newQuestion = useSelector((state: State) => state.newQuestion);
  const tutors = useSelector((state: State) => state.tutors);
  const dispatch = useAppDispatch()

  const selectedTutor = newQuestion?.tutorId
    ? tutors.find(t => t.id == newQuestion?.tutorId)
    : null

  React.useEffect(() => {
    if (!newQuestion?.content) {
      const timer = setTimeout(() => {
        router.push(`/${middleware}`)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [newQuestion, router, middleware])

  const onSubmit = async () => {
    try {
      const resultAction = await dispatch(submitQuestion());
      unwrapResult(resultAction);
      dispatch(clearNewQuestion());
      router.push(`/${middleware}`);
    } catch (rejectedValueOrSerializedError) {
      // エラー処理を実装する
    }
  }
  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      {newQuestion?.content ? (
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <QuestionContent
            content={newQuestion.content}
            name={selectedTutor?.last_name || null}
            university={selectedTutor?.university || null}
            faculty={selectedTutor?.faculty || null}
          />
        </Grid>
        <Grid container justifyContent="center" spacing={0.5} marginTop={3}>
          <Grid item xs={4} sm={3} md={2}>
            <BackButton />
          </Grid>
          <Grid item xs={4} sm={3} md={2}>
            <MiddleButton text='質問を変更する' href='question' />
          </Grid>
          <Grid item xs={4} sm={3} md={2}>
            <MiddleButton text='講師を変更する' href='tutor-option' />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" marginTop={2} marginBottom={3}>
          <Grid item xs={8} sm={6} md={4}>
            <ModalButton
              firstbuttontext={"質問する"}
              modaltext={"規約事項を守って質問を行ってください\n質問は取り消すことができません"}
              finalbuttontext={"質問する"}
              clickHandler={onSubmit}
            />
          </Grid>
        </Grid>
      </Grid>) : ""}
    </>
  )
}

export default Confirmation;