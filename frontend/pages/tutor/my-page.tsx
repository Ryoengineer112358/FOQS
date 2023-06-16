import { useAuth } from '@/hooks/auth'
import UserInfo from '@/components/UserInfo'
import DefaultLayout from '@/components/DefaultLayout'
import { Grid, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import type { NextPage } from 'next'
import TutorStatus from '@/components/TutorStatus'

const MyPage: NextPage = () => {
  const { user } = useAuth({ middleware: 'tutor' })

  return (
    <>
      <DefaultLayout middleware='tutor'>
        <div></div>
      </DefaultLayout>
      <Grid container justifyContent='center' marginBottom={1}>
        <Grid item xs={11} sm={7} md={5}>
          {user && (
            <>
              <Typography
                variant='h4'
                sx={{ color: 'white', textAlign: 'center' }}
              >
                講師ステータス
              </Typography>
              <TutorStatus tutorId={user.id} />
            </>
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent='center' marginTop={2}>
        <Grid item xs={11} sm={7} md={5}>
          {user && (
            <>
              <Typography
                variant='h4'
                sx={{ color: 'white', textAlign: 'center' }}
              >
                ユーザー情報
              </Typography>
              <UserInfo {...user} />
            </>
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <Grid item xs={6} sm={4} md={3} marginTop={2} marginBottom={3}>
          <LinkButton text='ホームに戻る' href='/tutor' />
        </Grid>
      </Grid>
    </>
  )
}

export default MyPage
