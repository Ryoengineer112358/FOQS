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
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.match('image.*')) {
        const objectUrl = URL.createObjectURL(file);
        console.log(file);
        console.log(objectUrl);
        setImageSrc(objectUrl);
      }
    }
    e.target.value = '';
  };

  const onRemoveImage = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setImageSrc(null);
  };

  useEffect(() => {
    console.log(imageSrc);
  }, [imageSrc]);

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
      {imageSrc &&
        <Box>
          <IconButton size="small" onClick={onRemoveImage}>
            <CloseIcon />
          </IconButton>
          <img src={imageSrc} alt="preview" style={{maxWidth: '100%'}} onLoad={() => {
            if (imageSrc) {
              URL.revokeObjectURL(imageSrc);
            }
          }}/>
        </Box>
      }
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
      <input type='file' hidden ref={cameraRef} onChange={onFileChange} accept='image/*' capture='environment' multiple />
      <ImageOutlinedIcon
        onClick={() => {
          console.log('Image icon clicked');
          console.log(inputRef.current);
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
      <input type='file' hidden ref={inputRef} onChange={onFileChange} accept='image/*' multiple />
    </Box>
  )
}

export default Textarea;
