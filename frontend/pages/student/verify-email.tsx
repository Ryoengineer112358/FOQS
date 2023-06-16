import type { NextPage } from 'next'
import * as VerifyEmailComponent from '@/components/Pages/VerifyEmail'

const VerifyEmail: NextPage = () => {
  return <VerifyEmailComponent.default userType={'student'} />
}

export default VerifyEmail
