import {
  AppBar,
  Box,
  Grid,
  Container,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Toolbar,
} from '@mui/material'
import { ReactElement, useEffect } from 'react'
import Link from 'next/link'
import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { State, useAppDispatch } from '@/store'
import { fetchTutors } from '@/store/modules/tutors'
import { useSelector } from 'react-redux'
import { setImages, setText, setTutorId } from '@/store/modules/newQuestion'
import { get } from 'idb-keyval'

const drawerWidth = '80%'

type Item = {
  label: string
  link: string
}

const navItemsForStudent: Item[] = [
  { label: 'ホーム', link: '/student' },
  { label: 'マイページ', link: '/student/my-page' },
  { label: '質問履歴', link: '/student/question-history' },
  { label: '講師一覧', link: '/student/tutors' },
]

const navItemsForTutor: Item[] = [
  { label: 'ホーム', link: '/tutor' },
  { label: 'マイページ', link: '/tutor/my-page' },
  { label: 'フリー質問一覧', link: '/tutor/unassigned-questions' },
  { label: '回答履歴', link: '/tutor/question-history' },
]

const DefaultLayout = ({
  middleware,
  children,
}: {
  middleware: string
  children: ReactElement
}) => {
  const tutors = useSelector((state: State) => state.tutors)
  const textInRedux = useSelector((state: State) => state.newQuestion?.text)
  const tutorIdInRedux = useSelector(
    (state: State) => state.newQuestion?.tutorId,
  )
  const imagesInRedux = useSelector(
    (state: State) => state.newQuestion?.images || [],
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    const restoreImages = async () => {
      const imageURLs = [] as string[]
      const maxRetires = 5
      for (let i = 0; i < maxRetires; i++) {
        try {
          const blob = await get(i)
          if (blob !== undefined) {
            imageURLs.push(URL.createObjectURL(blob))
            continue
          }
          // レスポンスがエラーの場合はループを抜ける
          console.info(`Get failed with index: ${i}`)
          break
        } catch (error) {
          // 通信エラーなどの場合はループを抜ける
          console.error(`Get failed with error: ${error}`)
          break
        }
      }
      dispatch(setImages(imageURLs))
    }

    if (middleware === 'student') {
      if (!textInRedux) {
        const questionText = localStorage.getItem('questionText')
        if (questionText) {
          dispatch(setText(questionText))
        }
      }

      if (tutors.length === 0) {
        dispatch(fetchTutors())
      }

      if (!tutorIdInRedux) {
        const tutorId = localStorage.getItem('tutorId')
        if (tutorId) {
          dispatch(setTutorId(Number(tutorId)))
        }
      }

      if (imagesInRedux.length === 0) {
        restoreImages()
      }
    }
  }, [
    middleware,
    textInRedux,
    tutors.length,
    tutorIdInRedux,
    imagesInRedux.length,
    dispatch,
  ])

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h4' sx={{ my: 2 }}>
        FOQS
      </Typography>
      <Divider />
      <List>
        {(middleware == 'student' ? navItemsForStudent : navItemsForTutor).map(
          (item: Item) => (
            <Link href={item.link} key={item.link}>
              <ListItem key={item.label} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ),
        )}
      </List>
    </Box>
  )

  return (
    <>
      {/* AppBar */}
      <AppBar
        component='nav'
        elevation={0}
        square={true}
        color='transparent'
        sx={{ backdropFilter: 'blur(10px)' }}
      >
        {middleware == 'guest' ? (
          <Toolbar>
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              fontSize='4rem'
              color='white'
            >
              <div>FOQS</div>
            </Grid>
          </Toolbar>
        ) : (
          <Toolbar>
            <Box
              component='div'
              sx={{ height: '1rem', width: '4rem', mr: 2 }}
            />
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              fontSize='4rem'
              color='white'
            >
              <Link href={`/${middleware}`}>FOQS</Link>
            </Grid>
            <IconButton
              color='primary'
              aria-label='open drawer'
              edge='end'
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        )}
      </AppBar>

      <Box component='nav'>
        <Drawer
          container={() => document.body}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // モバイルでのパフォーマンス向上のため
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              minWidth: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Page Content */}
      <Container maxWidth='sm'>
        <Box component='main' sx={{ paddingTop: '6.4rem' }}>
          {children}
        </Box>
      </Container>
    </>
  )
}

export default DefaultLayout
