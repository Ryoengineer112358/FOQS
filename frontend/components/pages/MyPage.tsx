import { useAuth } from '@/hooks/auth'
import UserInfo from '@/components/UserInfo'
import DefaultLayout from '@/components/DefaultLayout'
import {Grid} from "@mui/material"
import { useEffect, useState } from 'react'
import axios from "@/lib/axios"
import { Student, Tutor, Middleware } from '@/types'
import MiddleButton from '../MiddleButton'

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
      <Grid container justifyContent='center'>
        <Grid item xs={6} sm={4} md={3} marginTop={2} marginBottom={3}>
          <MiddleButton text='ホームに戻る' href={props.href} />
        </Grid>
      </Grid>
    </>
  )

}

export default MyPage
