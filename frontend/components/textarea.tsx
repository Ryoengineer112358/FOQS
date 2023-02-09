import {TextareaAutosize} from "@mui/material";

type Props = {
  value: string;
  changeHandler: Function;
}

const Textarea = (props: Props) => {

  return (
    <TextareaAutosize
      maxRows={100}
      aria-label="maximum height"
      placeholder="ここに質問を入力してください"
      onChange={(e: any) => props.changeHandler(e.target.value)}
      value={props.value}
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