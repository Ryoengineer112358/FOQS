import type { NextPage } from 'next'
import * as ChatComponent from "@/components/Pages/Chat";

const Chat: NextPage = () => {

  return <ChatComponent.default middleware={"student"} />
}

export default Chat