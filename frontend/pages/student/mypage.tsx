import { useAuth } from '../../hooks/auth'
import type { NextPage } from 'next'
import Profile from '../../components/profile'
import DefaultLayout from '../../components/defaultLayout'

const MyPage: NextPage = () => {
  const middleware = "student"
  const { user } = useAuth({ middleware: middleware })

  return (
    <>
      <DefaultLayout middleware={middleware}>
        <div></div>
      </DefaultLayout>
      <Profile name={user?.name} property={"第一志望校"} university={"東京大学大学院"}/>
    </>
  )

}

export default MyPage

