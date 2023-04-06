import {useAuth} from '@/hooks/auth';
import {FormEventHandler, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {NextPage} from "next";
import Link from "next/link";
import {Box, Button, Card, Checkbox, FormControlLabel, TextField, Container} from "@mui/material";
import DefaultLayout from "@/components/defaultLayout";

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
      <Card sx={{p: 4, borderRadius: 8}}>
        <Box
            onSubmit={submitForm}
            component="form"
        >
          {/* Email Address */}
          <Box>
            <TextField
                id="email"
                type="email"
                value={email}
                label="Eメール"
                onChange={event => setEmail(event.target.value)}
                required
                autoFocus
                sx={{ width: "80%" }}
            />
          </Box>

          {/* Password */}
          <Box sx={{marginTop: "0.8rem"}}>
            <TextField
                id="password"
                type="password"
                value={password}
                label="パスワード"
                onChange={event => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                sx={{ width: "80%" }}
            />
          </Box>

          {/* Remember Me */}
          <Box sx={{marginTop: "0.4rem"}}>
            <FormControlLabel
              label="ログインしたままにする"
              control={
                <Checkbox
                  id="remember_me"
                  name="remember"
                  color="info"
                  checked={shouldRemember}
                  onChange={event =>
                    setShouldRemember(event.target.checked)
                  }
                />
              }
            />
          </Box>
          <Container sx={{marginTop: "0.4rem"}}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{fontSize: '1.2rem', py: '0.8rem', px: '2.4rem'}}
            >
              ログイン
            </Button>
          </Container>
          <Container sx={{ marginTop: "0.8rem" }}>
            <Link href="/student/forgotpassword">
              パスワードを忘れた場合
            </Link>
          </Container>
          <Container sx={{ marginTop: "0.8rem" }}>
            <Link href="/student/register">
              新規登録
            </Link>
          </Container>
        </Box>
      </Card>
    </DefaultLayout>
  )
}

export default Login
