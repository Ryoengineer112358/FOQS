import React from 'react';
import { useState, useEffect } from 'react';
import SendMessage from './SendMessage';
import {StudentQuestion,isStudentQuestion, TutorAnswer, StudentComment, isStudentComment, isTutorAnswer} from '@/types';
import BackButton from "./BackButton";

import student from "../pages/student";

type MessageStudent = StudentComment & {className: String}
type MessageTutor = TutorAnswer & {className: String}
type TimelineItem = MessageStudent | MessageTutor

type Props = {
  middleware: string;
  question: StudentQuestion;
  sendFunction: Function;
}

function ChatMessage(props: Props) {

  return (
    <>
      {(() => {
        const messageTutor =
            props.question.tutor_answers.map(t => {
              return { ...t, className: props.middleware === "tutor" ? "sent" : "received" }
            })
        const messageStudent =
            props.question.student_comments.map(s => {
              return { ...s, className: props.middleware === "student" ? "sent" : "received" }
            })
            console.log(messageTutor)
        const messages = messageTutor.concat(messageStudent).sort(
              (a: TimelineItem, b: TimelineItem) => a.created_at.getTime() - b.created_at.getTime()
            )
        return (
          <div className="msgs">
            {props.question.text ? (
              <div>
              <div className={`msg ${props.middleware === "student" ? "sent" : "received"}`}>
                <p>{props.question.text}</p>
              </div>
              </div>
            ) : <></>}
            {messages.map(message => (
              <div key={message.id}>
                <div className={`msg ${message.className}`}>
                  <p>{message.text}</p>
                </div>
              </div>))}
          </div>
        )
      })()}
      {props.question.student_id !== 0 && (
        (props.question.closed_at)
        ? <></>
        : <SendMessage
            sendFunction={props.sendFunction}
            sender_role={props.middleware}
          />
      )}
   </>
  )
}

export default ChatMessage;