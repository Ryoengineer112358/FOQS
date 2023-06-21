import React, { useState } from 'react'
import { Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { defaultMessage } from '@/types'

type Props = {
  sendFunction: Function
  sender_role: string
}

function SendMessage(props: Props) {
  const [message, setMessage] = useState('')

  function sendMessage(e: React.SyntheticEvent) {
    e.preventDefault()
    if (message === '') {
      return
    }
    props.sendFunction({
      ...defaultMessage(),
      text: message,
    })

    setMessage('')
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            value={message}
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
