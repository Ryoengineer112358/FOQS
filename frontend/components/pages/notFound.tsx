import { Grid } from '@mui/material'
import { Middleware } from '@/types'
import DefaultLayout from '@/components/DefaultLayout'
import React from 'react'

const NotFound = () => {
  return (
    <>
      <Grid container justifyContent='center'>
        <h2>ページが見つかりません</h2>
      </Grid>
    </>
  )
}

export default NotFound
