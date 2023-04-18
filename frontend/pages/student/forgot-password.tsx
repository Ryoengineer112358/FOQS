import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useAuth } from '@/hooks/auth'
import { Box, Button, Card, TextField, Container, Typography, FormHelperText} from '@mui/material'
import DefaultLayout from '@/components/DefaultLayout'
import Link from "next/link";

const ForgotPassword: NextPage = () => {
  const router = useRouter();

  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  });
  interface ValidationErrorMessages {
    [key: string]: string[];
  }

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ValidationErrorMessages>({});
  const [status, setStatus] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false);

  useEffect(() => {
    const checkResetPasswordOpened = () => {
      if (localStorage.getItem("resetPasswordOpened") === "true") {
        router.push("/student/reset-password");
      }
    };
  
    window.addEventListener("storage", checkResetPasswordOpened);
    
    return () => {
      window.removeEventListener("storage", checkResetPasswordOpened);
    };
  }, []);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword({
      setErrors,
      setStatus,
      email,
      setStatusChanged,
    });
  };

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
          {!statusChanged && (
            <Typography
              variant="h6"
              align="center" // 中央揃えに
              fontWeight="bold"
              sx={{ marginBottom: '1rem' }} // 上下にスペースを空ける
            >
              パスワードを忘れた場合
            </Typography>
          )}

          <Typography
            variant="body1"
            align="center" // 中央揃えに
            sx={{ marginBottom: '1rem', width: '90%', textAlign: 'left' }} // 左右にスペースを空ける
          >
            {statusChanged ? (
              <>
                パスワード再設定メールを送信しました。届いたメール内のリンクをクリックして、パスワードの再設定を完了してください。
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

          {/* Email Address */}
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
                width: '100%', // 幅を80%に
              }}
            >
              送信
            </Button>
          </Container>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Link href="/student/login">
              <a>ログインページに戻る</a>
            </Link>
          </Box>
        </Box>
      </Card>
    </DefaultLayout>
  );
};

export default ForgotPassword;