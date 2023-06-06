import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import DefaultLayout from "@/components/DefaultLayout";
import CardMessage from "@/components/CardMessage";
import {useEffect, useState} from "react";
import {StudentQuestion} from "@/types";
import axios from "@/lib/axios";
import MiddleButton from '@/components/MiddleButton';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionHistory: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const [questions, setQuestions] = useState<Array<StudentQuestion>>([]);
  const [animationStart, setAnimationStart] = useState<boolean>(false);

  useEffect(() => {
    axios.get<StudentQuestion[]>('/api/questions?solved_only=true').then(
      result => {
        setQuestions(result.data)
        setAnimationStart(true);
      }
    )
  }, [])

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center" style={{ overflow: 'hidden' }}>
        <Grid item xs={12} md={8}>
          {questions.map((x, index) =>
            <motion.div 
              initial={{ opacity: 0, x: '100vw' }}
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.1, delay: index * 0.1, ease: "easeOut" }}
              key={x.id}
            >
              <CardMessage text={x.text} href={`/${middleware}/chat/${x.id}`} />
            </motion.div>
          )}
        </Grid>
      </Grid>
      <AnimatePresence>
        {animationStart && (
          <Grid container justifyContent="center">
            <Grid item xs={6} sm={4} md={3} marginTop={2} marginBottom={3}>
              <motion.div 
                initial={{ opacity: 0, x: '100vw' }}
                animate={{ opacity: 1, x: 0 }} 
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: questions.length * 0.1 - 0.1,
                }}
                exit={{ opacity: 0 }}
              >
                <MiddleButton text="ホームに戻る" href={`/${middleware}`} />
              </motion.div>
            </Grid>
          </Grid>
        )}
      </AnimatePresence>
    </>
  )
}

export default QuestionHistory