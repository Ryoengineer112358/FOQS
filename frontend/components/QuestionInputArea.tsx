import { TextareaAutosize, Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  text: string;
  images: string[];
  textChangeHandler: Function;
  imagesChangeHandler: Function;
}

const QuestionInputArea = (props: Props) => {
  const cameraRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrcs, setImageSrcs] = useState<string[]>(props.images);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const objectUrls = [] as string[];
      files.forEach(file => {
        if (file.type.match('image.*')) {
          objectUrls.push(URL.createObjectURL(file));
        }
      })
      setImageSrcs(prevImageSrcs => {
        const newImageSrcs = [...prevImageSrcs, ...objectUrls];
        props.imagesChangeHandler(newImageSrcs);
        return newImageSrcs;
      });
    }
    e.target.value = '';
  };

  const onRemoveImage = (index: number) => {
    URL.revokeObjectURL(imageSrcs[index]);
    setImageSrcs(prevImageSrcs => {
      const newImageSrcs = prevImageSrcs.filter((src, i) => i !== index);
      props.imagesChangeHandler(newImageSrcs);
      return newImageSrcs;
    });
  };

  return (
    <>
      <Box position="relative" width="100%">
        <TextareaAutosize
          minRows={5}
          maxRows={100}
          placeholder="ここに質問を入力してください。右下のアイコンをクリックすると画像を追加できます。"
          onChange={(e: any) => props.textChangeHandler(e.target.value)}
          value={props.text}
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
        <Box key={index} width="100%" textAlign="center" position="relative" marginTop={4}>
          <IconButton 
            onClick={() => onRemoveImage(index)}
            style={{position: "absolute", top: -40, left: 0}}
            sx={{color: 'black'}}
          >
            <CloseIcon style={{fontSize: 30}} />
          </IconButton>
          <img src={src} alt="preview" style={{maxWidth: '100%'}} />
        </Box>
      ))}
    </>
  )
}

export default QuestionInputArea;
