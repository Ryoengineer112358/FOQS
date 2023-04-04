import { useAuth } from "@/hooks/auth";
import {FormEventHandler, useEffect, useState} from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";
import {Box, Button, Card, TextField, Container} from "@mui/material";
import DefaultLayout from "@/components/defaultLayout";

const Register: NextPage = () => {
  const middleware = "guest";
  const loginDestination = "student";
  const router = useRouter();

  const { register } = useAuth({
    middleware: middleware,
    redirectIfAuthenticated: `/${loginDestination}`,
    loginDestination: loginDestination
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState<String | null>(null);

  const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus
    });
  };

  return (
    <DefaultLayout middleware={middleware}>
      <Card sx={{ p: 4, borderRadius: 8 }}>
        <Box onSubmit={submitForm} component="form">
          {/* Name */}
          <Box>
            <TextField
              id="name"
              type="text"
              value={name}
              label="名前"
              onChange={(event) => setName(event.target.value)}
              required
              autoFocus
              sx={{ width: "80%" }}
            />
          </Box>

          {/* Email Address */}
          <Box sx={{ marginTop: "0.8rem" }}>
            <TextField
              id="email"
              type="email"
              value={email}
              label="Eメール"
              onChange={(event) => setEmail(event.target.value)}
              required
              sx={{ width: "80%" }}
            />
          </Box>

          {/* Password */}
          <Box sx={{ marginTop: "0.8rem" }}>
            <TextField
              id="password"
              type="password"
              value={password}
              label="パスワード"
              onChange={(event) => setPassword(event.target.value)}
              required
              sx={{ width: "80%" }}
            />
          </Box>

          {/* Password Confirmation */}
          <Box sx={{ marginTop: "0.8rem" }}>
            <TextField
              id="password_confirmation"
              type="password"
              value={passwordConfirmation}
              label="パスワードの確認"
              onChange={(event) =>
                setPasswordConfirmation(event.target.value)
              }
              required
              sx={{ width: "80%" }}
            />
          </Box>

          <Container sx={{ marginTop: "0.8rem" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{fontSize: '1.2rem', py: '0.8rem', px: '2.4rem'}}
            >
              登録
            </Button>
          </Container>
          <Container sx={{ marginTop: "0.8rem" }}>
            <Link href="/student/login">ログインページに戻る</Link>
          </Container>
        </Box>
      </Card>
    </DefaultLayout>
  );
};

export default Register;
