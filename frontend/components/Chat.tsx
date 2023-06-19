import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import DefaultLayout from '@/components/DefaultLayout'
import ChatMessage from '@/components/ChatMessage'
import type {
  Middleware,
  StudentComment,
  StudentQuestion,
  TutorAnswer,
} from '@/types'
import { Box } from '@mui/material'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { defaultMessage } from '@/types'
import { convertDateTypeOnObject } from '@/utils'

type Props = {
  middleware: Middleware
}

const Chat = (props: Props) => {
  const { query, isReady } = useRouter()
  const questionId = query['question-id']

  const fetchMessages = () => {
    isReady &&
      axios
        .get<StudentQuestion>(`/api/questions/${questionId}`)
        .then((result) => setQuestion(convertDateTypeOnObject(result.data)))
  }

  useEffect(fetchMessages, [isReady])
  const { user } = useAuth({ middleware: props.middleware })
  const [question, setQuestion] = useState<StudentQuestion>({
    ...defaultMessage(),
    student_id: 0,
    tutor_answers: [],
    student_comments: [],
  })

  const updateMessages = (newMessage: StudentComment | TutorAnswer) => {
    const isStudent = props.middleware === 'student'
    const isTutor = props.middleware === 'tutor'
    setQuestion({
      ...question,
      student_comments: isStudent
        ? [...question.student_comments, newMessage]
        : question.student_comments,
      tutor_answers: isTutor
        ? [...question.tutor_answers, newMessage]
        : question.tutor_answers,
    })
    axios
      .post(`/api/questions/${questionId}`, { message: newMessage.text })
      .then()
  }

  return (
    <>
      <DefaultLayout middleware={props.middleware}>
        <div></div>
      </DefaultLayout>
      <Box sx={{ overflowY: 'scroll', paddingBottom: '0px' }}>
        <ChatMessage
          middleware={props.middleware}
          question={question}
          sendFunction={updateMessages}
        />
      </Box>
    </>
  )
}

export default Chat
