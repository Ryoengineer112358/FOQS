import React, { useState } from 'react'
import { NextPage } from 'next'
import { useAuth } from '@/hooks/auth'
import { Box, Button, Card, TextField, Container, Typography, Grid } from '@mui/material'
import DefaultLayout from '@/components/DefaultLayout'

const VerifyEmail: NextPage = () => {

  const middleware = 'student';

  const { resendEmailVerification, logout } = useAuth({
    middleware: middleware,
    redirectIfAuthenticated: `/${middleware}`
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('initial')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resendEmailVerification({ setErrors, setStatus })
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
                sx={{ marginBottom: '0.4rem', width: '90%', textAlign: 'left' }}
              >
                メールアドレス確認のため、メールを送信しました。<br />
                確認メールの内のリンクをクリックし、メールアドレスの認証を完了してください。<br />
                もしメールが届かない場合は、迷惑メールフォルダーに入っていないか、入力されたメールアドレスが正しいかご確認いただいた上で、再度お試しください。
              </Typography>

              {((status === 'sending') || (status === 'sent')) && (
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ marginTop: '0.4rem', marginBottom: '0.4rem', width: '80%', textAlign: 'left', color: 'red', fontWeight: 'bold', fontSize: '1.2rem' }}
                >
                  {status === 'sending' && (
                    <>
                      送信中…
                    </>
                  )}
                  {status === 'sent' && (
                    <>
                      送信完了
                    </>
                  )}
                </Typography>
              )}

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
              
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => logout(middleware)}
                >
                  <Typography>ログインページに戻る</Typography>
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}

export default VerifyEmail
