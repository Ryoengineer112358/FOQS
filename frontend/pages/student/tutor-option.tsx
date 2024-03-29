import { useAuth } from '@/hooks/auth'
import type { NextPage } from 'next'
import { Grid } from '@mui/material'
import * as React from 'react'
import DefaultLayout from '@/components/DefaultLayout'
import BackButton from '@/components/BackButton'
import ActionButton from '@/components/ActionButton'
import LinkButton from '@/components/LinkButton'
import { useAppDispatch } from '@/store'
import { setTutorId } from '@/store/modules/newQuestion'
import { useRouter } from 'next/router'

const TutorOption: NextPage = () => {
  const middleware = 'student'
  const { user } = useAuth({ middleware: middleware })
  const router = useRouter()
  const dispatch = useAppDispatch()

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Grid
        container
        justifyContent='center'
        spacing={1}
        marginTop={1}
        marginBottom={2}
      >
        <Grid item xs={10} md={4}>
          <LinkButton text={'質問する講師を選択'} href={'tutors'} />
        </Grid>
        <Grid item xs={10} md={4}>
          <ActionButton
            text={'講師を選択しないで質問'}
            onClickHandler={async () => {
              await dispatch(setTutorId(null))
              router.push('confirmation')
            }}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <Grid item xs={6} md={3}>
          <BackButton />
        </Grid>
      </Grid>
    </>
  )
}

export default TutorOption
