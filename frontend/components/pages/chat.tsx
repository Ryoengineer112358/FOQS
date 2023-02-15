import React, {useEffect, useState} from 'react'
import { useAuth } from '@/hooks/auth'
import DefaultLayout from '@/components/defaultLayout'
import ChatMessage from '@/components/chatMessage'
import BackButton from "@/components/backButton";
import {Middleware, StudentComment, StudentQuestion, Tutor, TutorAnswer} from "@/types";
import {Box} from "@mui/material";
import axios from "@/lib/axios";
import { useRouter} from "next/router";

type Message = StudentQuestion | TutorAnswer | StudentComment

type Props = {
  middleware: Middleware;
}

const Chat = (props: Props) => {
  const { query, isReady } = useRouter();
  const {questionid} = query;

  const fetchMessages = () => {
    isReady && axios.get<Message[]>(`/api/questions/${questionid}`).then(
      (result) => setMessages(result.data)
    )
  }

  useEffect(fetchMessages, [isReady])
  const { user } = useAuth({ middleware: props.middleware })
  const [messages, setMessages] = useState<Array<Message>>([]);

  const updateMessages = (newMessage: Message) => {
    setMessages([...messages, newMessage])
    axios.post(`/api/questions/${questionid}`, {message: newMessage.content}).then(
      fetchMessages
    )
  }

  return (
    <>
      <DefaultLayout middleware={props.middleware}>
        <div></div>
      </DefaultLayout>
      <ChatMessage middleware={props.middleware} messages={messages} sendFunction={updateMessages}/>
      <Box sx={{position: 'sticky', bottom: 0}}>
        <BackButton />
      </Box>
    </>
  )
}

export default Chat