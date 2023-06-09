import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BackButton from "@/components/BackButton";
import ActionButton from "@/components/ActionButton";
import NotFound from "@/components/Pages/NotFound";
import TutorProfile from "@/components/TutorProfile";
import {useRouter} from "next/router";
import {useSelector} from 'react-redux';
import {State, useAppDispatch} from "@/store";
import {setTutorId} from "@/store/modules/newQuestion";

const TutorId: NextPage = () => {

  const { query, isReady } = useRouter();
  const tutorId = query["tutor-id"];
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const router = useRouter()
  const tutors = useSelector((state: State) => state.tutors)
  const newQuestion = useSelector((state: State) => state.newQuestion)
  const selectedTutor = tutors.find(tutor => tutor.id == Number(tutorId));
  const dispatch = useAppDispatch()

  return (
      <DefaultLayout middleware={middleware}>
        {selectedTutor
            ?
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <TutorProfile
                  name={selectedTutor.last_name}
                  university={selectedTutor.university}
                  faculty={selectedTutor.faculty}
                />
              </Grid>
              <Grid item xs={10} marginTop={2} marginBottom={2}>
                <ActionButton
                  text={"この講師に質問する"}
                  onClickHandler={async () => {
                    await dispatch(setTutorId(selectedTutor.id))
                    const href = newQuestion?.text ? '../confirmation' : "../create-question"
                    router.push(href)
                  }}
                />
              </Grid>
              <Grid item xs={6} marginBottom={2}>
                <BackButton />
              </Grid>
            </Grid>
            : (isReady && tutors.length > 0 ?
                <NotFound/>: <></>)
        }
      </DefaultLayout>
  )
}

export default TutorId