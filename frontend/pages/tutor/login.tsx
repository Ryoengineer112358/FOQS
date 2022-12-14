import {useAuth} from '@/hooks/auth'
import {FormEventHandler, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {NextPage} from "next";
import Link from "next/link";
import {Box, Button, Card, Checkbox, FormControlLabel, TextField, Container} from "@mui/material";
import DefaultLayout from "@/components/defaultLayout";

const Login: NextPage = () => {
  const middleware = "guest"
  const loginDestination = 'tutor'
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
  const [status, setStatus] = useState<String|null>(null)

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
      <Card sx={{p: 3, borderRadius: 8}}>
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
            />
          </Box>

          {/* Remember Me */}
          <Box>
            <FormControlLabel
                label="ログインしたままにする"
                control={
                  <Checkbox
                      id="remember_me"
                      name="remember"
                      onChange={event => setShouldRemember(event.target.checked)}
                  />
                }
            />
          </Box>
          <Container>
            <Button type="submit" variant="contained">ログイン</Button>
          </Container>
          <Container>
            <Link href="/forgot-password">
              パスワードを忘れた場合
            </Link>
          </Container>
        </Box>
      </Card>
    </DefaultLayout>
  )
}

export default Login
