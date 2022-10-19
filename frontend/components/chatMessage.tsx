import React from 'react';
import { useState, useEffect } from 'react';
import SendMessage from './sendMessage';


function ChatMessage() {
  // const [messages, setMessages] = useState([]);
  const messages: string[] = ["こんにちは！", "写真を送りました", "この問題を解いてください、よろしくお願いします"];
  return (
    <>
      <div>
        {messages.map((message, index) => (
          <div key={message}>
            <p>{message}</p>
          </div>
        )
        )}
      </div>
      <SendMessage />
    </>
  )
}

export default ChatMessage;