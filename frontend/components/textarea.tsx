import {TextareaAutosize} from "@mui/material";
import { useRef } from "react";
import ImageIcon from '@mui/icons-material/Image';

type Props = {
  value: string;
  changeHandler: Function;
}

const Textarea = (props: Props) => {

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
    <TextareaAutosize
      maxRows={100}
      placeholder="ここに質問を入力してください"
      onChange={(e: any) => props.changeHandler(e.target.value)}
      value={props.value}
      style={{
        padding: 10,
        width: "100%",
        height: 480,
        borderRadius: 30
      }}
    />
    <ImageIcon
      onClick={() => {
        inputRef.current?.click();
      }
      }
    />
    <input type='file' hidden ref={inputRef} accept='image/*' capture='user' multiple />
    </>
  )
}

export default Textarea;