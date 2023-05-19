import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import QuestionContent from "@/components/QuestionContent";
import ModalButton from "@/components/ModalButton";
import { useRouter } from 'next/router';
import {useSelector} from 'react-redux';
import {State, useAppDispatch} from "@/store"
import { submitQuestion } from '@/store/modules/newQuestion';
import { unwrapResult } from '@reduxjs/toolkit';

const Confirmation: NextPage = () => {
  const router = useRouter()
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const newQuestion = useSelector((state: State) => state.newQuestion);
  const tutors = useSelector((state: State) => state.tutors);
  const dispatch = useAppDispatch()

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
        <h1 style={{color: "white", margin: 0}}>質問内容</h1>
            <QuestionContent content={newQuestion.content} />
            <h1 style={{color: "white", textAlign: "center", marginBottom: 0}}>質問講師</h1>
            <h2 style={{color: "white", textAlign: "center", margin: 0}}>
              {tutors.length == 0 ? "": (
              newQuestion.tutorId ? tutors.find(t => t.id == newQuestion.tutorId)!.last_name : "なし")}
            </h2>
        <BackButton />
        <ModalButton
          firstbuttontext={"質問する"}
          modaltext={"規約事項を守って質問を行ってください\n質問は取り消すことができません"}
          finalbuttontext={"質問する"}
          clickHandler={onSubmit}
        />
      </Grid>) : ""}
    </>
  )
}

export default Confirmation;