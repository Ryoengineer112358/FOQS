import {
  AppBar, Box, Grid, Container, IconButton,
  Typography, Divider, List, ListItem,
  ListItemButton, ListItemText, Drawer, Toolbar
} from "@mui/material";
import {ReactElement} from 'react'
import Link from 'next/link';
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = "80%";
const navItemsForStudent = ['ホーム', 'マイページ', '質問履歴', '講師一覧'];
const navItemsForTutor = ['ホーム', 'マイページ', 'フリー質問一覧', '回答履歴'];

const DefaultLayout = ({ middleware, children }: { middleware: String, children: ReactElement}) => {
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
          {(middleware == 'student' ? navItemsForStudent : navItemsForTutor).map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Box>
  );

  return (
    <>
      {/* AppBar */}
      <AppBar component="nav" elevation={0} square={true} color="transparent" sx={{backdropFilter: "blur(10px)"}}>
        <Toolbar>
          <Box component="div" sx={{height: "1rem", width: "4rem", mr: 2}}></Box>
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
