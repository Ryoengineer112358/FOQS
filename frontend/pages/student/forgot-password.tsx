import type { NextPage } from 'next'
import * as ForgotPasswordComponent from '@/components/Pages/ForgotPassword'

const ForgotPassword: NextPage = () => {
  return <ForgotPasswordComponent.default userType='student' />
}

export default ForgotPassword
