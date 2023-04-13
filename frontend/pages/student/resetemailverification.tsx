import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useAuth } from '@/hooks/auth'
import { Box, Button, Card, TextField, Container, Typography, Grid } from '@mui/material'
import DefaultLayout from '@/components/defaultLayout'
import Link from "next/link";

const ResendConfirmationEmail: NextPage = () => {
  const router = useRouter()

  const middleware = 'student';

  const { resendEmailVerification, logout } = useAuth({
    middleware: middleware,
    redirectIfAuthenticated: `/${middleware}`
  })

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resendEmailVerification({ setErrors, setStatus, email })
  }

  return (
    <DefaultLayout middleware="guest">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ p: 4, borderRadius: 8 }}>
            <Box
              onSubmit={handleSubmit}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              <Typography
                variant="body1"
                align="center"
                sx={{ marginBottom: '1rem', width: '90%', textAlign: 'left' }}
              >
                メールアドレス確認のため、メールを送信しました。<br />
                ご登録いただいたメールアドレス宛に届く確認メール内のリンクをクリックし、メールアドレスの認証を完了してください。<br />
                もしメールが届かない場合は、迷惑メールフォルダーに入っていないか、入力されたメールアドレスが正しいかご確認いただいた上で、再度お試しください。
              </Typography>

              {/* Email Address */}
              <Box sx={{ marginBottom: '0.8rem', width: '100%' }}>
                <TextField
                  id="email"
                  type="email"
                  value={email}
                  label="メールアドレス"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
              </Box>

              <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%', fontSize: '1.2rem', py: '0.8rem', px: '2.4rem', mt: '1rem' }}
                >
                  再送信
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
                <Button
                  variant=""
                  color="primary"
                  onClick={() => logout(middleware)}
                >
                  <a>ログインページに戻る</a>
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}

export default ResendConfirmationEmail
