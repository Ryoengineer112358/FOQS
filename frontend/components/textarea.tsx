import { TextareaAutosize, Box } from "@mui/material";
import { useRef } from "react";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

type Props = {
  value: string;
  changeHandler: Function;
}

const Textarea = (props: Props) => {
  const cameraRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box position="relative" width="100%">
      <TextareaAutosize
        maxRows={100}
        placeholder="ここに質問を入力してください"
        onChange={(e: any) => props.changeHandler(e.target.value)}
        value={props.value}
        style={{
          fontSize: 16,
          padding: 10,
          width: "100%",
          height: 480,
          borderRadius: 30
        }}
      />
      <CameraAltOutlinedIcon
        onClick={() => {
          cameraRef.current?.click();
        }}
        style={{
          color: "gray",
          fontSize: 80,
          position: "absolute",
          bottom: 15,
          right: 15,
        }}
      />
      <input type='file' hidden ref={cameraRef} accept='image/*' capture='environment' multiple />
      <ImageOutlinedIcon
        onClick={() => {
          inputRef.current?.click();
        }}
        style={{
          color: "gray",
          fontSize: 80,
          position: "absolute",
          bottom: 15,
          right: 95,
        }}
      />
      <input type='file' hidden ref={inputRef} accept='image/*' multiple />
    </Box>
  )
}

export default Textarea;