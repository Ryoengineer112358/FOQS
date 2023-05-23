import { useAuth } from '@/hooks/auth'
import UserInfo from '@/components/UserInfo'
import DefaultLayout from '@/components/DefaultLayout'
import HomeButton from '@/components/HomeButton'
import {Grid} from "@mui/material"
import { useEffect, useState } from 'react'
import axios from "@/lib/axios"
import { Student, Tutor, Middleware } from '@/types'

type Props = {
  middleware: Middleware,
  href: string
}

const MyPage = (props: Props) => {
  const { user } = useAuth({ middleware: props.middleware })
  
  return (
    <>
      <DefaultLayout middleware={props.middleware}>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          {user && <UserInfo {...user}/>}
        </Grid>
      </Grid>
      <Grid container justifyContent='right'>
        <HomeButton href={props.href} />
      </Grid>
    </>
  )

}

export default MyPage
