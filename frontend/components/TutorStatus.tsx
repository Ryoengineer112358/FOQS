import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { Typography } from '@mui/material'
import axios from '@/lib/axios'

type Props = {
  tutorId: number
}

const TutorStatus = (props: Props) => {
  const [averageRating, setAverageRating] = useState<number | null | undefined>(
    undefined,
  )

  useEffect(() => {
    if (props.tutorId) {
      axios
        .get(`/api/tutors/${props.tutorId}/average-rating`)
        .then((response) => setAverageRating(response.data.average_rating))
        .catch(() => setAverageRating(undefined))
    }
  }, [props.tutorId])

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 0,
        }}
      >
        <Typography>評価：</Typography>
        {averageRating === undefined ? (
          <Typography>集計中…</Typography>
        ) : averageRating !== null ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name='average-rating'
              value={averageRating}
              readOnly
              size='small'
            />
            <Typography sx={{ marginLeft: 1 }}>
              {parseFloat(Number(averageRating).toFixed(2)).toString()}/5
            </Typography>
          </Box>
        ) : (
          <Typography>まだ評価がありません</Typography>
        )}
      </Box>
    </Box>
  )
}

export default TutorStatus
