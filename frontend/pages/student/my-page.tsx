import { useAuth } from '@/hooks/auth'
import UserInfo from '@/components/UserInfo'
import DefaultLayout from '@/components/DefaultLayout'
import { Grid } from "@mui/material"
import LinkButton from '@/components/LinkButton'
import type { NextPage } from 'next'

const MyPage: NextPage = () => {
  const { user } = useAuth({ middleware: "student" })

  return (
    <>
      <DefaultLayout middleware="student">
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          {user && <UserInfo {...user}/>}
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <Grid item xs={6} sm={4} md={3} marginTop={2} marginBottom={3}>
          <LinkButton text='ホームに戻る' href="/student" />
        </Grid>
      </Grid>
    </>
  )
}

export default MyPage
