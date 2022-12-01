import React, {useEffect, useState} from 'react'
import { useAuth } from '../../../hooks/auth'
import type { NextPage } from 'next'
import DefaultLayout from '../../../components/defaultLayout'
import ChatMessage from '../../../components/chatMessage'
import BackButton from "../../../components/backButton";
import {StudentComment, StudentQuestion, Tutor, TutorAnswer} from "../../../types";
import {Box} from "@mui/material";
import axios from "../../../lib/axios";
import { useRouter} from "next/router";

const Chat: NextPage = () => {
  const router = useRouter();
  const {questionid} = router.query;
  // console.log(questionid)
  useEffect(() => {
    axios.get(`/api/questions/${questionid}`).then(
      (result) => setMessages( result.data.map((x: StudentQuestion) => x))
    )
  }, [router])
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  // const initialMessages: Array<StudentQuestion | TutorAnswer | StudentComment> = [
  //   {
  //     id: 1,
  //     content: "こちらの画像の問題を解いてください",
  //     student_id: 1,
  //     tutor_id: 1,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  //   {
  //     id: 1,
  //     content: "画像確認お願いします",
  //     tutor_id: 1,
  //     student_question_id: 1,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     sender_role: "tutor",
  //   },
  //   {
  //     id: 1,
  //     content: "理解しました！ありがとうございました！",
  //     student_question_id: 1,
  //     tutor_id: 1,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     sender_role: "student",
  //   },
  // ];
  const [messages, setMessages] = useState<Array<StudentQuestion | TutorAnswer | StudentComment>>([]);

  const updateMessages = (newMessage: StudentQuestion | TutorAnswer | StudentComment) => {
    setMessages([...messages, newMessage])
  }

  return (
    <>
       <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <ChatMessage middleware={middleware} messages={messages} sendFunction={updateMessages}/>
      <Box sx={{position: 'sticky', bottom: 0}}>
        <BackButton />
      </Box>
    </>
  )
}

export default Chat