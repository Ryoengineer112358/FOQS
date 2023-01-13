import React from 'react'
import type { NextPage } from 'next'
import Chat from "@/components/pages/chat";

const ChatPage: NextPage = () => {

  return <Chat middleware={"tutor"} />
}

export default ChatPage