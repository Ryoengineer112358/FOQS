import React, {useState} from 'react'
import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import DefaultLayout from '../../components/defaultLayout'
import ChatMessage from '../../components/chatMessage'
import {StudentComment, StudentQuestion, TutorAnswer} from "../../types/types";

const Chat: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })
  const initialMessages: Array<StudentQuestion | TutorAnswer | StudentComment> = [
    {
      id: 1,
      content: "こちらの画像の問題を解いてください",
      student_id: 1,
      tutor_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 1,
      content: "画像確認お願いします",
      tutor_id: 1,
      student_question_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      sender_role: "tutor",
    },
    {
      id: 1,
      content: "理解しました！ありがとうございました！",
      student_question_id: 1,
      tutor_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      sender_role: "student",
    },
  ];
  const [messages, setMessages] = useState(initialMessages);

  const updateMessages = (newMessage: StudentQuestion | TutorAnswer | StudentComment) => {
    setMessages([...messages, newMessage])
  }

  return (
    <>
       <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <ChatMessage middleware={middleware} messages={messages} sendFunction={updateMessages}/>
    </>
  )
}

export default Chat