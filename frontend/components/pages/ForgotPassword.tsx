import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import {
  Box,
  Button,
  Card,
  TextField,
  Container,
  Typography,
  FormHelperText,
} from '@mui/material'
import DefaultLayout from '@/components/DefaultLayout'
import Link from 'next/link'
import type { Middleware } from '@/types'

type Props = {
  userType: Middleware
}

const ForgotPassword = (props: Props) => {
  const router = useRouter()

  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })
  type ValidationErrorMessages = {
    [key: string]: string[]
  }

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<ValidationErrorMessages>({})
  const [status, setStatus] = useState('initial')
  const [statusChanged, setStatusChanged] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    forgotPassword({
      user_type: props.userType,
      setErrors,
      setStatus,
      email,
      setStatusChanged,
    })
  }

  return (
    <DefaultLayout middleware='guest'>
      <Card sx={{ p: 4, borderRadius: 8 }}>
        <Box
          onSubmit={handleSubmit}
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {!statusChanged && (
            <Typography
              variant='h6'
              align='center'
              fontWeight='bold'
              sx={{ marginBottom: '1rem' }}
            >
              パスワードを忘れた場合
            </Typography>
          )}

          <Typography
            variant='body1'
            align='center'
            sx={{ marginBottom: '0.8rem', width: '90%', textAlign: 'left' }}
          >
            {statusChanged ? (
              <>
                届いたメール内のリンクをクリックして、パスワードの再設定を完了してください。
                <br />
                もしメールが届かない場合は、迷惑メールフォルダーに入っていないか、入力されたメールアドレスが正しいかご確認いただいた上で、再度お試しください。
              </>
            ) : (
              <>
                登録時に入力したメールアドレスを入力してください。
                <br />
                パスワードリセット用のメールが届きますので、そちらから新しいパスワードを設定してください。
              </>
            )}
          </Typography>

          <Typography
            variant='body1'
            align='center'
            sx={{
              marginBottom: '1.2rem',
              width: '80%',
              textAlign: 'left',
              color: 'red',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            {status === 'sending' && <>送信中…</>}
            {status === 'sent' && <>送信完了</>}
          </Typography>

          {/* Email Address */}
          <Box sx={{ marginBottom: '1rem', width: '90%' }}>
            <TextField
              id='email'
              type='email'
              value={email}
              label='メールアドレス'
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              error={!!errors.email}
            />
            <FormHelperText error>{errors.email?.[0]}</FormHelperText>
          </Box>

          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              sx={{
                fontSize: '1.2rem',
                py: '0.8rem',
                px: '2.4rem',
                textTransform: 'none',
                width: '100%',
              }}
            >
              送信
            </Button>
          </Container>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Link href={`/${props.userType}/login`}>
              <a>ログインページに戻る</a>
            </Link>
          </Box>
        </Box>
      </Card>
    </DefaultLayout>
  )
}

export default ForgotPassword
