import useSWR from 'swr'
import axios from '../lib/axios'
import {useEffect} from 'react'
import { useRouter } from 'next/router'
import {Middleware, Tutor, Student, isTutor, isStudent} from '../types'
import {convertDateTypeOnObject} from '../utils'

type Props = {
  middleware: Middleware,
  redirectIfAuthenticated?: string,
  loginDestination?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated, loginDestination }: Props) => {
  const router = useRouter()

  const { data: user, error, mutate } = useSWR('/api/user', () => {
      const url = '/api/myself'
      return axios
          .get(url)
          .then(res => {
              const fetchedUser: Tutor | Student = res.data
              return convertDateTypeOnObject(fetchedUser)
          })
          .catch(error => {
            if (error.response.status !== 409) throw error

            router.push('/verify-email')
          })},
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf()

    setErrors({})
    setStatus('registering')

    axios
        .post('/register', props)
        .then(() => {
          setStatus('registered')
          mutate()
          setTimeout(() => {
            router.push(`/${loginDestination}/verify-email`)
          }, 1000);
        })
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(error.response.data.errors)
          setStatus('initial')
        })
  }

  const login = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf()

    setErrors({})
    setStatus(null)

    axios
        .post('/login', props)
        .then(() => mutate())
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(error.response.data.errors)
        })
  }

  const forgotPassword = async ({ setErrors, setStatus, email, setStatusChanged }: any) => {
    await csrf()

    setErrors({})
    setStatus('sending')

    axios
        .post('/forgot-password', { email })
        .then(response => {
          setStatus('sent');
          setStatusChanged(true);
        })
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(error.response.data.errors)
          setStatus('initial')
        })
  }

  const resetPassword = async ({ setErrors, setStatus, email, newPassword, passwordConfirmation, token }: any) => {
    await csrf()

    setErrors({})
    setStatus(null)

    axios
        .post('/reset-password', { 
          token,
          email,
          password: newPassword,
          password_confirmation: passwordConfirmation,
        })
        .then(response => router.push(`/${response.data.userType}/login?reset=${encodeURI(response.data.status)}`))
        .catch(error => {
          if (error.response.status !== 422) throw error
 
          setErrors(error.response.data.errors)
        })
  }

  const resendEmailVerification = ({ setStatus, setErrors, user_type }: any) => {

    setErrors({})
    setStatus('sending')
    
    axios
        .post('/email/verification-notification', {user_type})
        .then(response => setStatus('sent'))
        .catch(error => {
          if (error.response.status === 429) {
            setErrors({message: 'しばらく時間をおいてから再度お試しください。'})
          } else {
            setErrors({message: 'エラーが発生しました。再度お試しください。'})
          }
          setStatus('initial')
        });
  }

  const logout = async (middleware: Middleware) => {
    if (! error) {
      await axios
          .post('/logout')
          .then(() => mutate())
    }

    router.push(`/${middleware}/login`)
  }

  useEffect(() => {
    // console.log("isStudent " + isStudent(user)); console.log("isTutor " + isTutor(user)); console.log(user);
    if (user && !user.email_verified_at && !error) router.push(`/${middleware == 'guest' ? loginDestination: middleware}/verify-email`)
    else if (middleware === 'guest' && user && !error && redirectIfAuthenticated) router.push(redirectIfAuthenticated)
    else if (middleware !== 'guest' && error) logout(middleware)
    else if (middleware === 'tutor' && user && isStudent(user)) router.push('/student')
    else if (middleware === 'student' && user && isTutor(user)) router.push('/tutor')
    else if (window.location.pathname.indexOf('verify-email') > -1 && user?.email_verified_at && redirectIfAuthenticated) router.push(redirectIfAuthenticated)

  }, [user, error])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  }
}
