import type { NextPage } from 'next'
import * as React from 'react'
import Home from '@/components/Pages/Home'

const Top: NextPage = () => {
  return (
    <>
      <Home middleware={'tutor'} />
    </>
  )
}

export default Top
