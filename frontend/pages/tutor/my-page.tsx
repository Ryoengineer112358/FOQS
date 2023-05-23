import type { NextPage } from 'next'
import * as MyPapeComponent from '@/components/Pages/MyPage'

const MyPage: NextPage = () => {
  return <MyPapeComponent.default middleware="tutor" href="/tutor" />
}

export default MyPage
