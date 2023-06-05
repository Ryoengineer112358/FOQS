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
import { useState, useEffect } from 'react';
import  type { StudentQuestion } from '@/types';
import axios from '@/lib/axios';

const ConfirmQuestion: NextPage = () => {
  const router = useRouter()
  const { query, isReady } = router
  const questionId = query["question-id"]
  const middleware = "tutor"
  const { user } = useAuth({ middleware: middleware })
  const [question, setQuestion] = useState<StudentQuestion | null>(null)

  useEffect(() => {
    if (isReady) {
      axios.get<StudentQuestion>(`/api/questions/${questionId}`)
      .then(response => {
        const questionData = response.data;
        if ( questionData.tutor_id === null && questionData.closed_at === null) {
          setQuestion(questionData);
        } else {
          router.push('/tutor/unassigned-questions');
        }
      })
      .catch(error => {
        console.error(error);
      })
    }
  }, [isReady, questionId])

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      {question?.text ? (
      <>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <QuestionContent
              text={question?.text || ""}
              images={question?.images || []}
              student_name={question?.student!.last_name || ""}
              first_choice_university={question?.student!.first_choice_university || ""}
              first_choice_faculty={question?.student!.first_choice_faculty || ""}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent='center' marginTop={3}>
          <Grid item xs={8} sm={6} md={4}>
            <ModalButton
              firstbuttontext={"質問を取得する"}
              modaltext={"一度質問を取得すると、取り消すことができません"}
              finalbuttontext={"取得する"}
              clickHandler={() => {
                axios.put<StudentQuestion>(`/api/questions/${question.id}`)
                .then(() => {
                  router.push('/tutor')
                })
                .catch(error => {
                  console.error(error);
                })
              }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent='center' marginTop={2} marginBottom={3}>
          <Grid item xs={6} sm={4} md={2}>
            <BackButton />
          </Grid>
        </Grid>
      </>) : ""}
    </>
  )
}

export default ConfirmQuestion;