import {useAuth} from '@/hooks/auth';
import {FormEventHandler, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {NextPage} from "next";
import Link from "next/link";
import {Box, Button, Grid, Card, Checkbox, FormControlLabel, TextField, Container} from "@mui/material";
import DefaultLayout from "@/components/DefaultLayout";

const Login: NextPage = () => {
  const middleware = "guest"
  const loginDestination = 'student'
  const router = useRouter()

  const { login } = useAuth({
    middleware: middleware,
    redirectIfAuthenticated: `/${loginDestination}`,
    loginDestination: loginDestination
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState([])
  //ログインページでは不要
  const [status, setStatus] = useState<String|null>(null)

  //ログインページでは不要
  useEffect(() => {
    const reset = router.query.reset
    if (typeof reset === "string" && reset.length > 0 && errors.length === 0) {
      setStatus(atob(reset))
    } else {
      setStatus(null)
    }
  })

  const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    login({ email, password, remember: shouldRemember, setErrors, setStatus })
  }

  return (
    <DefaultLayout middleware={middleware}>
      <Card sx={{ p: 4, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid
          container
          onSubmit={submitForm}
          component="form"
          sx={{ width: '100%', maxWidth: '400px' }}
        >
          {/* Email Address */}
          <Grid item xs={12}>
            <TextField
              id="email"
              type="email"
              value={email}
              label="Eメール"
              onChange={(event) => setEmail(event.target.value)}
              required
              autoFocus
              sx={{ width: "100%" }}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12} sx={{ marginTop: "0.8rem" }}>
            <TextField
              id="password"
              type="password"
              value={password}
              label="パスワード"
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              sx={{ width: "100%" }}
            />
          </Grid>

          {/* Remember Me */}
          <Grid item xs={12} sx={{ marginTop: "0.8rem", display: 'flex', justifyContent: 'center' }}>
            <FormControlLabel
              label="ログインしたままにする"
              control={
                <Checkbox
                  id="remember_me"
                  name="remember"
                  color="info"
                  checked={shouldRemember}
                  onChange={(event) =>
                    setShouldRemember(event.target.checked)
                  }
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '100%', fontSize: '1.2rem', py: '0.8rem', px: '2.4rem', mt: '1rem' }}
            >
              ログイン
            </Button>
          </Grid>
        </Grid>
        <Container sx={{ marginTop: "2rem", display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Link href="/student/forgot-password">
            パスワードを忘れた場合
          </Link>
        </Container>
        <Container sx={{ marginTop: "0.8rem", display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Link href="/student/register">
            新規登録
          </Link>
        </Container>
      </Card>
    </DefaultLayout>
  )
}

export default Login
