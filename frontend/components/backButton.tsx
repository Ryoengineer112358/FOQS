import { Button } from '@mui/material'
import { TurnLeft } from '@mui/icons-material'

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
