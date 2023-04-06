import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useAuth } from '@/hooks/auth'
import { Box, Button, Card, TextField, Container, Typography} from '@mui/material'
import DefaultLayout from '@/components/defaultLayout'
import Link from "next/link";

const ForgotPassword: NextPage = () => {
  const router = useRouter()

  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/'
  })

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    forgotPassword({ setErrors, setStatus, email })
  }

  return (
    <DefaultLayout middleware="guest">
      <Card sx={{ p: 4, borderRadius: 8 }}>
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // 中央揃えに
          }}
        >
          <Typography
            variant="h5"
            align="center" // 中央揃えに
            fontWeight="bold"
            sx={{ marginBottom: '1rem' }} // 上下にスペースを空ける
          >
            パスワードを忘れた場合
          </Typography>

          <Typography
            variant="body1"
            align="center" // 中央揃えに
            sx={{ marginBottom: '1rem', width: '90%', textAlign: 'left' }} // 左右にスペースを空ける
          >
            登録時に入力したメールアドレスを入力してください。<br />
            パスワードリセット用のメールが届きますので、そちらから新しいパスワードを設定してください。
          </Typography>

          {/* Email Address */}
          <Box sx={{ marginBottom: '1rem', width: '90%' }}>
            <TextField
              id="email"
              type="email"
              value={email}
              label="メールアドレス"
              onChange={(e) => setEmail(e.target.value)}
              required
              // autoFocus
              fullWidth // 幅を100%に
            />
          </Box>

          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                fontSize: '1.2rem',
                py: '0.8rem',
                px: '2.4rem',
                textTransform: 'none',
                width: '80%', // 幅を80%に
              }}
            >
              送信
            </Button>
          </Container>
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          {status && <p>{status}</p>}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Link href="/student/login">
              <a>ログインページに戻る</a>
            </Link>
          </Box>

        </Box>
      </Card>
    </DefaultLayout>
  )
}


export default ForgotPassword
