import React from 'react'
import { useState } from 'react';
import { Input } from '@mui/material';
import SendIcon from "@mui/icons-material/Send"

type Props = {
  sendFunction: Function;
  sender_role: string;
}

function SendMessage(props: Props) {
  const [message, setMessage] = useState("");

  function sendMessage(e: any) {
    //型のanyはいずれ変更する
    console.log(e);
    e.preventDefault();
    if (message === '') {
      return;
    }
    props.sendFunction({
      id: 0,
      content: message,
      tutor_id: 0,
      student_question_id: 0,
      created_at: new Date(),
      updated_at: new Date(),
      sender_role: props.sender_role,
    })
    //ここにDBとのやりとりを記載

    setMessage("");
  }

  return (
    <>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <Input
            sx={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            placeholder="メッセージを入力してください"
            type="text"
            onChange={(e: any) => setMessage(e.target.value)}
            value={message}
          />
          <SendIcon
            onClick={sendMessage}
            style={{ color: "#7AC2FF", marginLeft: "20px" }}
          />
        </div>
      </form>
    </>
  )
}

export default SendMessage