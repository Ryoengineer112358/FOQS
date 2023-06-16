import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { Typography } from '@mui/material'

type Props = {
  name: string
  university: string
  faculty: string
  rating: number | null | undefined
}

const TutorProfile = (props: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        backgroundColor: 'primary.main',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Typography>名前：{props.name} 先生</Typography>
      <Typography>大学：{props.university}</Typography>
      <Typography>学部：{props.faculty}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 0,
        }}
      >
        <Typography>評価：</Typography>
        {props.rating === undefined ? (
          <Typography>集計中…</Typography>
        ) : props.rating !== null ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name='average-rating'
              value={props.rating}
              readOnly
              size='small'
            />
            <Typography sx={{ marginLeft: 1 }}>
              {parseFloat(Number(props.rating).toFixed(2)).toString()}/5
            </Typography>
          </Box>
        ) : (
          <Typography>まだ評価がありません</Typography>
        )}
      </Box>
    </Box>
  )
}

export default TutorProfile
