import * as React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../src/utils/createEmotionCache'
import { Layout } from '../src/components/layout/layout'
import {
  ThemeProvider,
  responsiveFontSizes,
  createTheme,
} from '@mui/material/styles'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )
  const router = useRouter()

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  const getTitle = (path: string) => {
    if (path === '/') return 'Salvatore Argentieri'
    let title = path.substring(1)
    return title[0].toUpperCase() + title.slice(1).toLowerCase()
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{getTitle(router?.pathname)}</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={responsiveFontSizes(theme)}>
          <Layout title={getTitle(router?.pathname)}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  )
}
