import type { NextPage } from 'next'
import Chat from "@/components/Pages/Chat";

const ChatPage: NextPage = () => {

  return <Chat middleware={"student"} />
}

export default ChatPage