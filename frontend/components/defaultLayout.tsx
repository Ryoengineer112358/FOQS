import {
  AppBar, Box, Grid, Container, IconButton,
  Typography, Divider, List, ListItem,
  ListItemButton, ListItemText, Drawer, Toolbar
} from "@mui/material";
import {ReactElement, useEffect} from 'react'
import Link from 'next/link';
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {State, useAppDispatch} from "@/store";
import {fetchTutors} from "@/store/modules/tutors";
import {useSelector} from "react-redux";
import {setContent, setTutorId} from "@/store/modules/newQuestion";

const drawerWidth = "80%";

type Item = {
  label: string;
  link: string;
}

const navItemsForStudent: Item[] = [
  {'label' : 'ホーム', 'link': '/student'},
  {'label' : 'マイページ', 'link': '/student/my-page'},
  {'label' : '質問履歴', 'link': '/student/question-history'},
  {'label' : '講師一覧', 'link': '/student/tutors'},
]

const navItemsForTutor: Item[] = [
  {'label' : 'ホーム', 'link': '/tutor'},
  {'label' : 'マイページ', 'link': '/tutor/my-page'},
  {'label' : 'フリー質問一覧', 'link': '/tutor/questions'},
  {'label' : '回答履歴', 'link': '/tutor/question-history'},
];

const DefaultLayout = ({ middleware, children }: { middleware: String, children: ReactElement}) => {

  const tutors = useSelector((state: State) => state.tutors)
  const dispatch = useAppDispatch()
  useEffect(() => {
    // 生徒でログインしている場合は講師一覧を初回取得
    if (middleware == "student") {
      dispatch(setContent(localStorage.getItem("questionContent")))
      if (tutors.length == 0) dispatch(fetchTutors())
      dispatch(setTutorId(localStorage.getItem("tutorId")))
    }
  }, []);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          FOQS
        </Typography>
        <Divider />
        <List>
          {(middleware == 'student' ? navItemsForStudent : navItemsForTutor).map((item: Item) => (
            <Link href={item.link} key={item.link} >
              <ListItem key={item.label} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
  );

  return (
    <>
      {/* AppBar */}
      <AppBar component="nav" elevation={0} square={true} color="transparent" sx={{backdropFilter: "blur(10px)"}}>
          {middleware == "guest" ?
            <Toolbar>
              <Grid container alignItems="center" justifyContent="center" fontSize="4rem" color="white">
                <div>FOQS</div>
              </Grid>
            </Toolbar>
          :
            <Toolbar>
              <Box component="div" sx={{height: "1rem", width: "4rem", mr: 2}}/>
              <Grid container alignItems="center" justifyContent="center" fontSize="4rem" color="white">
                <Link href={`/${middleware}`}>
                  FOQS
                </Link>
              </Grid>
              <IconButton
                  color="primary"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          }
      </AppBar>

      <Box component="nav">
        <Drawer
            container={() => document.body}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', minWidth: drawerWidth },
            }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Page Content */}
      <Container maxWidth="sm">
        <Box component="main" sx={{paddingTop: "6.4rem"}}>{children}</Box>
      </Container>
    </>
  )
}

export default DefaultLayout
