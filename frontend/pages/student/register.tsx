import { useAuth } from "@/hooks/auth";
import {FormEventHandler, useEffect, useState} from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";
import { Box, Button, Card, Grid, TextField, Container, FormControl, InputLabel, InputAdornment, Select, MenuItem } from "@mui/material";
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

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [firstChoiceUniversity, setFirstChoiceUniversity] = useState("");
  const [firstChoiceFaculty, setFirstChoiceFaculty] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState<String | null>(null);

  const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    register({
      last_name: lastName,
      first_name: firstName,
      email,
      password,
      password_confirmation: passwordConfirmation,
      high_school: highSchool,
      first_choice_university: firstChoiceUniversity,
      first_choice_faculty: firstChoiceFaculty,
      birth_date: birthDate,
      gender,
      setErrors,
      setStatus
    });
  };

  return (
    <DefaultLayout middleware={middleware}>
      <Card sx={{ p: 4, borderRadius: 8 }}>
        <form onSubmit={submitForm}>
          {/* 苗字と名前 */}
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <TextField
                  id="last_name"
                  type="text"
                  value={lastName}
                  label="苗字"
                  onChange={(event) => setLastName(event.target.value)}
                  required
                  autoFocus
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="first_name"
                  type="text"
                  value={firstName}
                  label="名前"
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>

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

            {/* 高校名 */}
            <Box sx={{ marginTop: "0.8rem" }}>
              <TextField
                id="high_school"
                type="text"
                value={highSchool}
                label="高校名"
                onChange={(event) => setHighSchool(event.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">高校</InputAdornment>,
                }}
                required
                sx={{ width: "80%" }}
              />
            </Box>

            {/* 第一志望大学 */}
            <Box sx={{ marginTop: "0.8rem" }}>
              <TextField
                id="first_choice_university"
                type="text"
                value={firstChoiceUniversity}
                label="第一志望大学"
                onChange={(event) => setFirstChoiceUniversity(event.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">大学</InputAdornment>,
                }}
                required
                sx={{ width: "80%" }}
              />
            </Box>

            {/* 第一志望学部 */}
            <Box sx={{ marginTop: "0.8rem" }}>
              <TextField
                id="first_choice_faculty"
                type="text"
                value={firstChoiceFaculty}
                label="第一志望学部"
                onChange={(event) => setFirstChoiceFaculty(event.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">学部</InputAdornment>,
                }}
                required
                sx={{ width: "80%" }}
              />
            </Box>

            {/* 生年月日 */}
            <Box sx={{ marginTop: "0.8rem" }}>
              <TextField
                id="birth_date"
                type="date"
                value={birthDate}
                label={birthDate ? "生年月日" : ""}
                onChange={(event) => setBirthDate(event.target.value)}
                required
                sx={{ width: "80%" }}
                InputLabelProps={{
                  shrink: !!birthDate,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {!birthDate && "生年月日"}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* 性別 */}
            <Box sx={{ marginTop: "0.8rem" }}>
              <FormControl fullWidth sx={{ width: "80%" }}>
                <InputLabel id="gender-label" htmlFor="gender">性別</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  required
                  label="性別"
                >
                  <MenuItem value={0}>男</MenuItem>
                  <MenuItem value={1}>女</MenuItem>
                  <MenuItem value={2}>無回答</MenuItem>
                </Select>
              </FormControl>
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
        </form>
      </Card>
    </DefaultLayout>
  );
};

export default Register;
