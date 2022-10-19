import React from 'react'
import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import DefaultLayout from '../../components/defaultLayout'
import ChatMessage from '../../components/chatMessage'

const Chat: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
       <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <ChatMessage />
    </>
  )
}

export default Chat