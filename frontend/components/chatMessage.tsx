import React from 'react';
import { useState, useEffect } from 'react';
import SendMessage from './sendMessage';
import {StudentQuestion,isStudentQuestion, TutorAnswer, StudentComment, isStudentComment, isTutorAnswer} from '@/types';
import BackButton from "./backButton";

import student from "../pages/student";


type Props = {
  middleware: string;
  messages: Array<StudentQuestion | TutorAnswer | StudentComment>;
  sendFunction: Function;
}

function ChatMessage(props: Props) {
  // const [messages, setMessages] = useState([]);

  return (
    <>
      <div className="msgs">
        {props.messages.map((message, index) => (
          <div key={message.id}>
            <div
                 className={`msg ${
                   (props.middleware === "student" && (isStudentQuestion(message) || isStudentComment(message)))
                     || (props.middleware === "tutor" && (!isStudentQuestion(message) && isTutorAnswer(message))) ? "sent" : "received"
                 }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        )
        )}
      </div>
      <SendMessage sendFunction={props.sendFunction} sender_role={props.middleware}/>
    </>
  )
}

export default ChatMessage;