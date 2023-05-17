import {TextareaAutosize} from "@mui/material";

type Props = {
  value: string;
  changeHandler: Function;
}

const Textarea = (props: Props) => {

  return (
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
  )
}

export default Textarea;