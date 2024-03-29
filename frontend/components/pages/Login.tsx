import { useAuth } from '@/hooks/auth'
import { FormEventHandler, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Button,
  Grid,
  Card,
  Checkbox,
  FormControlLabel,
  TextField,
  Container,
  FormHelperText,
} from '@mui/material'
import DefaultLayout from '@/components/DefaultLayout'
import type { Middleware } from '@/types'

type Props = {
  userType: Middleware
}

const Login = (props: Props) => {
  const middleware = 'guest'
  const loginDestination = props.userType
  const router = useRouter()

  const { login } = useAuth({
    middleware: middleware,
    redirectIfAuthenticated: `/${loginDestination}`,
    loginDestination: loginDestination,
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  type ValidationErrorMessages = {
    [key: string]: string[]
  }
  const [errors, setErrors] = useState<ValidationErrorMessages>({})
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const reset = router.query.reset
    if (reset === 'password-reset') {
      setStatus('パスワードをリセットしました。')
    } else {
      setStatus(null)
    }
  })

  const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    login({
      user_type: props.userType,
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    })
  }

  return (
    <DefaultLayout middleware={middleware}>
      <Card
        sx={{
          p: 4,
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {status && <p style={{ fontWeight: 'bold', color: 'red' }}>{status}</p>}

        <Grid
          container
          onSubmit={submitForm}
          component='form'
          sx={{ width: '100%', maxWidth: '400px' }}
        >
          {/* Email Address */}
          <Grid item xs={12}>
            <TextField
              id='email'
              type='email'
              value={email}
              label='Eメール'
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete='email'
              sx={{ width: '100%' }}
              error={!!errors.email}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12} sx={{ marginTop: '0.8rem' }}>
            <TextField
              id='password'
              type='password'
              value={password}
              label='パスワード'
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete='current-password'
              sx={{ width: '100%' }}
              error={!!errors.email}
            />
            <FormHelperText error>{errors.email?.[0]}</FormHelperText>
          </Grid>

          {/* Remember Me */}
          <Grid
            item
            xs={12}
            sx={{
              marginTop: '0.8rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <FormControlLabel
              label='ログインしたままにする'
              control={
                <Checkbox
                  id='remember_me'
                  name='remember'
                  color='info'
                  checked={shouldRemember}
                  onChange={(event) => setShouldRemember(event.target.checked)}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              sx={{
                width: '100%',
                fontSize: '1.2rem',
                py: '0.8rem',
                px: '2.4rem',
                mt: '1rem',
              }}
            >
              ログイン
            </Button>
          </Grid>
        </Grid>
        <Container
          sx={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Link href={`/${props.userType}/forgot-password`}>
            パスワードを忘れた場合
          </Link>
        </Container>
        <Container
          sx={{
            marginTop: '0.8rem',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Link href={`/${props.userType}/register`}>新規登録</Link>
        </Container>
      </Card>
    </DefaultLayout>
  )
}

export default Login
