import type { NextPage } from 'next'
import * as LoginComponent from '@/components/Pages/Login'

const Login: NextPage = () => {
  return <LoginComponent.default userType={'student'} />
}

export default Login
