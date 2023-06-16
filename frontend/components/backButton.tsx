import { Button } from '@mui/material'
import { ReactElement } from 'react'
import { TurnLeft } from '@mui/icons-material'
import Link from 'next/link'

const BackButton = () => {
  return (
    <>
      <Button
        startIcon={<TurnLeft />}
        variant='outlined'
        onClick={() => history.back()}
        sx={{
          width: '100%',
          height: 80,
          borderRadius: 100,
        }}
      >
        戻る
      </Button>
    </>
  )
}

export default BackButton
