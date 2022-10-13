import useSWR from 'swr'
import axios from '../lib/axios'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated, loginDestination }: any = {}) => {
  const router = useRouter()

  const { data: user, error, mutate } = useSWR('/api/user', () => {
      const url = `/api/myself_${loginDestination||middleware}`
      return axios
          .get(url)
          .then(res => res.data)
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

  const loginTutor = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
        .post('/tutor/login', props)
        .then(() => mutate())
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(error.response.data.errors)
        })
  }

    const loginStudent = async ({ setErrors, setStatus, ...props }: any) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/student/login', props)
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

  const logout = async (middleware: String) => {
    if (! error) {
      await axios
          .post('/logout')
          .then(() => mutate())
    }

    window.location.pathname = `${middleware}/login`
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    if (window.location.pathname === "/verify-email" && user?.email_verified_at) router.push(redirectIfAuthenticated)
    if ((middleware === 'tutor'|| middleware === 'student')  && error) logout(middleware)
  }, [user, error])

  return {
    user,
    register,
    loginTutor,
    loginStudent,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  }
}
