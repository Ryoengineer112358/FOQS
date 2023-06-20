import * as React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'
type Props = {
  text: string
  href: string
}

const CardMessage = (props: Props) => {
  return (
    <>
      <Link href={props.href}>
        <Card
          variant='outlined'
          sx={{
            mt: 2,
            p: 1,
            height: 80,
            borderRadius: 100,
          }}
        >
          <CardContent>
            <Typography>{props.text}</Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  )
}

export default CardMessage
