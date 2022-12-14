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

  const register = async ({ setErrors, ...props }: any) => {
    await csrf()

    setErrors([])

    axios
        .post('/register', props)
        .then(() => mutate())
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(error.response.data.errors)
        })
  }

  const login = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
        .post(`/${loginDestination}/login`, props)
        .then(() => mutate())
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(error.response.data.errors)
        })
  }

  const forgotPassword = async ({ setErrors, setStatus, email }: any) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
        .post('/forgot-password', { email })
        .then(response => setStatus(response.data.status))
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(error.response.data.errors)
        })
  }

  const resetPassword = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
        .post('/reset-password', { token: router.query.token, ...props })
        .then(response => router.push('/login?reset=' + btoa(response.data.status)))
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(error.response.data.errors)
        })
  }

  const resendEmailVerification = ({ setStatus }: any) => {
    axios
        .post('/email/verification-notification')
        .then(response => setStatus(response.data.status))
  }

  const logout = async (middleware: Middleware) => {
    if (! error) {
      await axios
          .post('/logout')
          .then(() => mutate())
    }

    router.push(`${middleware}/login`)
  }

  useEffect(() => {
    // console.log("isStudent " + isStudent(user)); console.log("isTutor " + isTutor(user)); console.log(user);
    if (middleware === 'guest' && user && redirectIfAuthenticated) router.push(redirectIfAuthenticated)
    if (middleware !== 'guest' && error) logout(middleware)
    if (middleware === 'tutor' && user && isStudent(user)) router.push('/student')
    if (middleware === 'student' && user && isTutor(user)) router.push('/tutor')
    if (window.location.pathname === "/verify-email" && user?.email_verified_at && redirectIfAuthenticated) router.push(redirectIfAuthenticated)
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
