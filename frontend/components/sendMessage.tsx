import React from 'react'
import { useState } from 'react';
import { Input } from '@mui/material';
import SendIcon from "@mui/icons-material/Send"
import {StudentComment, StudentQuestion, TutorAnswer} from "../types/types";
import {any} from "prop-types";

type Props = {
  sendFunction: Function;
}

function SendMessage(props: Props) {
  const [message, setMessage] = useState("");

  function sendMessage(e: any) {
    //型のanyはいずれ変更する
    console.log(e);
    e.preventDefault();
    props.sendFunction({
      id: 1,
      content: message,
      student_id: 1,
      tutor_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
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
            style={{ color: "#7AC2FF", marginLeft: "20px" }}
          />
        </div>
      </form>
    </>
  )
}

export default SendMessage