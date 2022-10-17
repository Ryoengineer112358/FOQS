import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#ffffff',
      }
    }
  })

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
  )
}

export default MyApp
