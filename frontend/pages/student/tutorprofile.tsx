import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import {Grid} from "@mui/material";
import * as React from "react";
import DefaultLayout from "@/components/defaultLayout";
import BackButton from "@/components/backButton";
import LargeButton from "@/components/largeButton";
import NotFound from "@/components/pages/notFound";
import Tutor from "@/components/tutor";
import HomeButton from "@/components/homeButton";
import Profile from "@/components/profile";
import {useRouter} from "next/router";
import {useSelector} from 'react-redux';
import {State, useAppDispatch} from "@/store";
import {setTutorId} from "@/store/modules/newQuestion";

const TutorId: NextPage = () => {

  const { query, isReady } = useRouter();
  const {tutorId} = query;
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const tutors = useSelector((state: State) => state.tutors)
  const newQuestion = useSelector((state: State) => state.newQuestion)
  const selectedTutor = tutors.find(tutor => tutor.id == Number(tutorId));
  const dispatch = useAppDispatch()

  return (
      <DefaultLayout middleware={middleware}>
        {selectedTutor
            ?
            <Grid container justifyContent="center">
              <Profile name={selectedTutor.last_name} property={"大学"} university={selectedTutor.university} />
              <LargeButton
                  text={"この講師に質問する"}
                  onClickHandler={() => dispatch(setTutorId(selectedTutor.id))}
                  href={(newQuestion && newQuestion.content) ?   '../confirmation' : "../question"}
              />
              <BackButton />
              <HomeButton href={"/student"}/>
            </Grid>
            : (isReady && tutors.length > 0 ?
                <NotFound/>: <></>)
        }
      </DefaultLayout>
  )
}

export default TutorId