import React from 'react'
import SendMessage from './SendMessage'
import { StudentQuestion, TutorAnswer, StudentComment } from '@/types'

type MessageStudent = StudentComment & { className: string }
type MessageTutor = TutorAnswer & { className: string }
type TimelineItem = MessageStudent | MessageTutor

type Props = {
  middleware: string
  question: StudentQuestion
  sendFunction: Function
}

function ChatMessage(props: Props) {
  return (
    <>
      {(() => {
        const messageTutor = props.question.tutor_answers.map((t) => {
          return {
            ...t,
            className: props.middleware === 'tutor' ? 'sent' : 'received',
          }
        })
        const messageStudent = props.question.student_comments.map((s) => {
          return {
            ...s,
            className: props.middleware === 'student' ? 'sent' : 'received',
          }
        })
        console.log(messageTutor)
        const messages = messageTutor
          .concat(messageStudent)
          .sort(
            (a: TimelineItem, b: TimelineItem) =>
              a.created_at.getTime() - b.created_at.getTime(),
          )
        return (
          <div className='msgs'>
            {props.question.image_urls &&
              props.question.image_urls.map((url, index) => (
                <div key={index} className='image'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${url}`}
                    style={{ width: '100%' }}
                    alt='生徒が質問をした時に送った画像'
                  />
                </div>
              ))}
            {props.question.text ? (
              <div>
                <div
                  className={`msg ${
                    props.middleware === 'student' ? 'sent' : 'received'
                  }`}
                >
                  <p>{props.question.text}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`msg ${message.className}`}>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        )
      })()}
      {props.question.student_id !== 0 &&
        (props.question.closed_at ? (
          <></>
        ) : (
          <SendMessage
            sendFunction={props.sendFunction}
            sender_role={props.middleware}
          />
        ))}
    </>
  )
}

export default ChatMessage
