import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import { Box, Button, Card, TextField, Container, Typography, Grid, FormHelperText } from '@mui/material'
import DefaultLayout from '@/components/DefaultLayout'
import Link from "next/link";
import type { Middleware } from "@/types";

type Props = {
    userType: Middleware
}

const ResetPassword = (props: Props) => {
  const router = useRouter()

  const { resetPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/'
  })

  const [newPassword, setNewPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  type ValidationErrorMessages = {
    [key: string]: string[];
  };
  const [errors, setErrors] = useState<ValidationErrorMessages>({})
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState('');
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resetPassword({
			user_type: props.userType,
			setErrors,
			setStatus,
			email,
			password: newPassword,
			password_confirmation: passwordConfirmation,
			token: router.query.token as string
    })
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
                variant="h6"
                align="center"
                fontWeight="bold"
                sx={{ marginBottom: '1rem' }}
              >
                パスワードリセット
              </Typography>

              <Box sx={{ marginBottom: '1rem', width: '90%' }}>
                <TextField
                  id="email"
                  type="email"
                  value={email}
                  label="メールアドレス"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  error={!!errors.email}
                />
                <FormHelperText error>{errors.email?.[0]}</FormHelperText>
              </Box>

              {/* New Password */}
              <Box sx={{ marginBottom: '1rem', width: '90%' }}>
                <TextField
                  id="new_password"
                  type="password"
                  value={newPassword}
                  label="新しいパスワード"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  fullWidth
                  error={!!errors.password}
                />
                <FormHelperText error>{errors.password?.[0]}</FormHelperText>
              </Box>

              {/* Password Confirmation */}
              <Box sx={{ marginBottom: '1rem', width: '90%' }}>
                <TextField
                  id="password_confirmation"
                  type="password"
                  value={passwordConfirmation}
                  label="新しいパスワード (確認)"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  fullWidth
                  error={!!errors.password}
                />
                <FormHelperText error>{errors.password?.[0]}</FormHelperText>
              </Box>

              <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    fontSize: '0.9rem',
                    py: '1.2rem',
                    px: '2.4rem',
                    textTransform: 'none',
                    width: '100%',
                  }}
                >
                    パスワードをリセット
                  </Button>
              </Container>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Link href={`/${props.userType}/login`}>
                  <a>ログインページに戻る</a>
                </Link>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}

export default ResetPassword
