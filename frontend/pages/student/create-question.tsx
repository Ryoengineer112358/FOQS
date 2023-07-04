import type { NextPage } from 'next'
import React, { useState, useRef } from 'react'
import { Grid, TextareaAutosize, Box, IconButton } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useAuth } from '@/hooks/auth'
import DefaultLayout from '@/components/DefaultLayout'
import BackButton from '@/components/BackButton'
import ActionButton from '@/components/ActionButton'
import { setText, setImages, removeImage } from '@/store/modules/newQuestion'
import { useAppDispatch, State } from '@/store'
import { useRouter } from 'next/router'
import { MAX_IMAGES } from '@/utils'

const CreateQuestion: NextPage = () => {
  const router = useRouter()
  const middleware = 'student'
  const { user } = useAuth({ middleware: middleware })
  const newQuestion = useSelector((state: State) => state.newQuestion)
  const dispatch = useAppDispatch()
  const cameraRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const onChangeQuestionContent = (value: string) => {
    dispatch(setText(value))
  }

  const onChangeQuestionImages = (value: string[]) => {
    dispatch(setImages(value))
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)

      if ((newQuestion?.images?.length || 0) + files.length > MAX_IMAGES) {
        setError(`※画像は${MAX_IMAGES}枚までしかアップロードできません`)
        return
      }

      setError('')

      const objectUrls = [] as string[]

      for (const file of files) {
        if (file.type === 'image/heic' || file.type === 'image/heif') {
          try {
            // ダイナミックインポート
            const heic2any = (await import('heic2any')).default
            const convertedBlob = (await heic2any({
              blob: file,
              toType: 'image/jpeg',
              quality: 0.8,
            })) as Blob
            objectUrls.push(URL.createObjectURL(convertedBlob))
          } catch (err) {
            console.error('Failed to convert HEIC/HEIF to JPEG: ', err)
          }
        } else if (file.type.match('image.*')) {
          objectUrls.push(URL.createObjectURL(file))
        }
      }

      onChangeQuestionImages([...(newQuestion?.images ?? []), ...objectUrls])
    }
    e.target.value = ''
  }

  const onRemoveImage = async (index: number) => {
    if (newQuestion?.images) {
      URL.revokeObjectURL(newQuestion.images[index])
      try {
        const resultAction = await dispatch(removeImage(index))
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to remove image: ', err)
      }
    }
  }

  const onNext = () => {
    if (newQuestion?.text?.trim() === '') {
      setError('※質問文は必須です')
      return
    }

    router.push(newQuestion?.tutorId ? 'confirmation' : 'tutor-option')
  }

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent='center' marginBottom={3}>
        <Grid item xs={12} md={8} marginBottom={2}>
          <Box position='relative' width='100%'>
            {error && (
              <p style={{ textAlign: 'center', color: 'red', fontSize: 20 }}>
                {error}
              </p>
            )}
            <TextareaAutosize
              minRows={5}
              maxRows={100}
              placeholder='ここに質問を入力してください。右下のアイコンをクリックすると画像を追加できます。画像は最大5枚までアップロードできます。'
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                onChangeQuestionContent(e.target.value)
                setError('')
              }}
              value={newQuestion?.text ?? ''}
              style={{
                fontSize: 16,
                padding: 10,
                width: '100%',
                borderRadius: 30,
              }}
            />
          </Box>
          <Box textAlign='right'>
            <CameraAltOutlinedIcon
              onClick={() => cameraRef.current?.click()}
              style={{
                color: 'white',
                fontSize: 80,
              }}
            />
            <input
              type='file'
              hidden
              ref={cameraRef}
              onChange={onFileChange}
              accept='image/*,.heic,.heif'
              capture='environment'
              multiple
            />
            <ImageOutlinedIcon
              onClick={() => inputRef.current?.click()}
              style={{
                color: 'white',
                fontSize: 80,
              }}
            />
            <input
              type='file'
              hidden
              ref={inputRef}
              onChange={onFileChange}
              accept='image/*,.heic,.heif'
              multiple
            />
          </Box>
          {newQuestion?.images?.map((src, index) => (
            <Box
              key={index}
              width='100%'
              textAlign='center'
              position='relative'
              marginTop={4}
            >
              <IconButton
                onClick={() => onRemoveImage(index)}
                style={{ position: 'absolute', top: -40, left: 0 }}
                sx={{ color: 'black' }}
              >
                <CloseIcon style={{ fontSize: 30 }} />
              </IconButton>
              <img
                src={src}
                alt='画像のプレビュー'
                style={{ maxWidth: '100%' }}
              />
            </Box>
          ))}
        </Grid>
        <Grid item container justifyContent='center' spacing={1}>
          <Grid item xs={6} md={2}>
            <BackButton />
          </Grid>
          <Grid item xs={6} md={2}>
            <ActionButton text={'次へ'} onClickHandler={onNext} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateQuestion
