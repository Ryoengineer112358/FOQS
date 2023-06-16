import type { NextPage } from 'next'
import * as RegisterComponent from '@/components/Pages/Register'

const Register: NextPage = () => {
  return <RegisterComponent.default userType={'tutor'} />
}

export default Register
