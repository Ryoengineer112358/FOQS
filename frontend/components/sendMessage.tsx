import React from 'react'
import { useState } from 'react';
import { Input } from '@mui/material';
import SendIcon from "@mui/icons-material/Send"

function SendMessage() {
  const [message, setMessage] = useState("");

  function sendMessage(e: any) {
    //型のanyはいずれ変更する
    e.preventDefault();

    //ここにDBとのやりとりを記載

    setMessage("");
  }

  return (
    <>
      <form onSubmit={sendMessage}>
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
        <SendIcon style={{ color: "#7AC2FF", marginLeft: "20px" }}/>
      </form>
    </>
  )
}

export default SendMessage