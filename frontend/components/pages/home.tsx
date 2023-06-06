import { useAuth } from '@/hooks/auth'
import {Grid} from "@mui/material";
import {FormEventHandler, useEffect, useState, ReactElement} from 'react'
import * as React from "react";
import axios from "@/lib/axios";
import {Middleware, StudentQuestion} from "@/types";
import DefaultLayout from "@/components/DefaultLayout";
import CardMessage from "@/components/CardMessage";
import MiddleButton from '../MiddleButton';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  middleware: Middleware;
}

const Home = (props: Props) => {
  const { user } = useAuth({ middleware: props.middleware })

  const [questions, setQuestions] = useState<Array<StudentQuestion>>([]);
  const [animationStart, setAnimationStart] = useState<boolean>(false);

  useEffect(() => {
    axios.get<StudentQuestion[]>('/api/questions').then(
      result => {
        setQuestions(result.data)
        setAnimationStart(true);
      }
    )
  }, [])

  return (
    <>
      <DefaultLayout middleware={props.middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center" style={{ overflow: 'hidden' }}>
        <Grid item xs={12} md={10}>
          {questions.map((x, index) =>
            <motion.div 
              initial={{ opacity: 0, x: '100vw' }}
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.1, delay: index * 0.1, ease: "easeOut" }}
              key={x.id}
            >
              <CardMessage text={(() => {
                if(x.tutor_answers.length == 0 && x.student_comments.length == 0) {
                  return x.text;
                } else if (x.tutor_answers.length == 0) {
                  return x.student_comments[0].text;
                } else if (x.student_comments.length == 0) {
                  return x.tutor_answers[0].text;
                } else {
                  return x.tutor_answers[0].created_at > x.student_comments[0].created_at ? x.tutor_answers[0].text : x.student_comments[0].text;
                }
              })()
              } href={`${props.middleware}/chat/${x.id}`} />
            </motion.div>
          )}
        </Grid>
        <AnimatePresence>
          {animationStart && props.middleware === 'student' && (
            <Grid container justifyContent="center" spacing={1} marginTop={2} marginBottom={3}>
              <Grid item xs={6} sm={4} md={3}>
                <motion.div 
                  initial={{ opacity: 0, x: '100vw' }}
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: questions.length * 0.1 - 0.1
                  }}
                  exit={{ opacity: 0 }}
                >
                  <MiddleButton text="質問履歴" href="student/question-history"/>
                </motion.div>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <motion.div 
                  initial={{ opacity: 0, x: '100vw' }}
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: questions.length * 0.1 - 0.1
                  }}
                  exit={{ opacity: 0 }}
                >
                  <MiddleButton text="質問する" href={"student/create-question"}/>
                </motion.div>
              </Grid>
            </Grid>
          )}
          {animationStart && props.middleware === 'tutor' && (
            <Grid container justifyContent="center" marginTop={3} marginBottom={3}>
              <Grid item xs={8} sm={6} md={4}>
                <motion.div 
                  initial={{ opacity: 0, x: '100vw' }}
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: questions.length * 0.1 - 0.1
                  }}
                  exit={{ opacity: 0 }}
                >
                  <MiddleButton text="質問を見つける" href="tutor/unassigned-questions"/>
                </motion.div>
              </Grid>
            </Grid>
          )}
        </AnimatePresence>
      </Grid>
    </>
  )
}

export default Home
