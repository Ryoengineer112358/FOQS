import {useAuth} from '@/hooks/auth'
import type {NextPage} from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import {useSelector} from 'react-redux'
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import Tutor from "@/components/Tutor";
import {State} from "@/store"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const Tutors: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const tutors = useSelector((state: State) => state.tutors)
  const [animationStart, setAnimationStart] = useState<boolean>(false);

  useEffect(() => {
    if (tutors.length > 0) {
      setAnimationStart(true);
    }
  }, [tutors]);

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center" style={{ overflow: 'hidden' }}>
        <Grid item xs={12} sm={10} md={8}>
          {tutors.map((t, index) =>
            <motion.div
              initial={{ opacity: 0, x: '100vw' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: index * 0.1, ease: "easeOut" }}
              key={t.id}
            >
              <Tutor key={t.id} text={`${t.university}${t.faculty} ${t.last_name}先生`} href={`tutor-profile/${t.id}`} />
            </motion.div>
          )}
        </Grid>
        <AnimatePresence>
          {animationStart && (
            <Grid container justifyContent="center" marginTop={3} marginBottom={3}>
              <Grid item xs={6} sm={4} md={3}>
                <motion.div
                  initial={{ opacity: 0, x: '100vw' }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: tutors.length * 0.1 - 0.1,
                  }}
                  exit={{ opacity: 0 }}
                >
                  <BackButton />
                </motion.div>
              </Grid>
            </Grid>
          )}
        </AnimatePresence>
      </Grid>
    </>
  )
}

export default Tutors