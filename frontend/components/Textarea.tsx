import { TextareaAutosize, Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  value: string;
  changeHandler: Function;
}

const Textarea = (props: Props) => {
  const cameraRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const objectUrls = [] as string[];
      files.forEach(file => {
        if (file.type.match('image.*')) {
          objectUrls.push(URL.createObjectURL(file));
        }
      })
      setImageSrcs(objectUrls);
    }
    e.target.value = '';
  };

  const onRemoveImage = (index: number) => {
    URL.revokeObjectURL(imageSrcs[index]);
    setImageSrcs(prevImageSrcs => prevImageSrcs.filter((src, i) => i !== index));
  };

  return (
    <>
      <Box position="relative" width="100%">
        <TextareaAutosize
          minRows={5}
          maxRows={100}
          placeholder="ここに質問を入力してください。右下のアイコンをクリックすると画像を追加できます。"
          onChange={(e: any) => props.changeHandler(e.target.value)}
          value={props.value}
          style={{
            fontSize: 16,
            padding: 10,
            width: "100%",
            borderRadius: 30
          }}
        />
      </Box>
      <Box textAlign="right">
        <CameraAltOutlinedIcon
          onClick={() => cameraRef.current?.click()}
          style={{
            color: "white",
            fontSize: 80,
          }}
        />
        <input type='file' hidden ref={cameraRef} onChange={onFileChange} accept='image/*' capture='environment' multiple />
        <ImageOutlinedIcon
          onClick={() => inputRef.current?.click()}
          style={{
            color: "white",
            fontSize: 80,
          }}
        />
        <input type='file' hidden ref={inputRef} onChange={onFileChange} accept='image/*' multiple />
      </Box>
      {imageSrcs.map((src, index) => (
        <Box key={index} width="100%">
          <IconButton onClick={() => onRemoveImage(index)}>
            <CloseIcon />
          </IconButton>
          <img src={src} alt="preview" style={{maxWidth: '100%'}} />
        </Box>
      ))}
    </>
  )
}

export default Textarea;
