import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import Profile from '@/components/Profile'
import DefaultLayout from '@/components/DefaultLayout'
import HomeButton from '@/components/HomeButton'
import {Grid} from "@mui/material"
import { useEffect, useState } from 'react'
import axios from "@/lib/axios"
import { Student } from '@/types'

const MyPage: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  const [userInfo, setUserInfo] = useState<Student | null>(null)

  useEffect(() => {
    if (user) {
      axios.get<Student>(`/api/myself`).then(
        response => setUserInfo(response.data)
      )
    }
  }, [user])

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          {userInfo && <Profile {...userInfo} />}
        </Grid>
      </Grid>
      <Grid container justifyContent='right'>
        <HomeButton href='/student' />
      </Grid>
    </>
  )

}

export default MyPage

