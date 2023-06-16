import type { NextPage } from 'next'
import * as ResetPasswordComponent from '@/components/Pages/ResetPassword'
import { redirectIfWithoutToken } from '@/components/Pages/ResetPassword'

const ResetPassword: NextPage = () => {
  return <ResetPasswordComponent.default userType='tutor' />
}

export const getServerSideProps = redirectIfWithoutToken('tutor')

export default ResetPassword
