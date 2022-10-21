import {TextareaAutosize} from "@mui/material";

const Textarea = () => {

  return (
    <TextareaAutosize
      maxRows={100}
      aria-label="maximum height"
      placeholder="ここに質問を入力してください"
      // defaultValue="ここに質問を入力してください"
      style={{
        padding: 10,
        width: 360,
        height: 320,
        borderRadius: 30
      }}
    />
  )
}

export default Textarea;