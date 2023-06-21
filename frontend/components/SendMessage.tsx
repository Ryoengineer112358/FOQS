import React, { useState, useEffect } from 'react'
import { Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { defaultMessage } from '@/types'
import { useRouter } from 'next/router'

type Props = {
  sendFunction: Function
  sender_role: string
}

function SendMessage(props: Props) {
  const { query } = useRouter()
  const questionId = query['question-id']

  const [chatMessage, setChatMessage] = useState('')

  useEffect(() => {
    const savedChatMessage = localStorage.getItem(`chatMessage-${questionId}`)
    if (savedChatMessage) {
      setChatMessage(savedChatMessage)
    }
  }, [questionId])

  function sendMessage(e: React.SyntheticEvent) {
    e.preventDefault()
    if (chatMessage === '') {
      return
    }
    props.sendFunction({
      ...defaultMessage(),
      text: chatMessage,
    })

    localStorage.removeItem(`chatMessage-${questionId}`)
    setChatMessage('')
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem(`chatMessage-${questionId}`, e.target.value)
    setChatMessage(e.target.value)
  }

  return (
    <>
      <form onSubmit={sendMessage}>
        <div className='sendMsg'>
          <Input
            sx={{
              width: '78%',
              fontSize: '15px',
              fontWeight: '550',
              marginLeft: '5px',
              marginBottom: '-3px',
            }}
            placeholder='メッセージを入力してください'
            type='text'
            onChange={handleInputChange}
            value={chatMessage}
          />
          <SendIcon
            onClick={sendMessage}
            style={{ color: '#7AC2FF', marginLeft: '20px' }}
          />
        </div>
      </form>
    </>
  )
}

export default SendMessage
