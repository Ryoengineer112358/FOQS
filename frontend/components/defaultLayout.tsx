import { useAuth } from '../hooks/auth'
import {AppBar, Box, Grid, Link, Container} from "@mui/material";
import {ReactElement} from 'react'

const DefaultLayout = ({ middleware, children }: { middleware: String, children: ReactElement}) => {
  const href = `/${middleware}`
  return (
    <>
      {/* AppBar */}
      <AppBar component="nav" elevation={0} square={true} color="transparent" sx={{backdropFilter: "blur(10px)"}}>
        <Grid container alignItems="center" justifyContent="center" fontSize="4rem">
          <Link href={ href } underline="none"><span color="primary">FOQS</span></Link>
        </Grid>
      </AppBar>

      {/* Page Heading */}
      <header>
        <div>
        </div>
      </header>

      {/* Page Content */}
      <Container maxWidth="sm">
        <Box component="main" sx={{paddingTop: "6.4rem"}}>{children}</Box>
      </Container>
    </>
  )
}

export default DefaultLayout