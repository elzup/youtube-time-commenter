import { MuiThemeProvider } from '@material-ui/core'
import { NextPage } from 'next'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import GlobalStyle from '../components/global'
import { theme } from '../components/theme'

const App: NextPage<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <MuiThemeProvider theme={theme}>
      <Head>
        <title>{'YouTube 拡張コメントツール'}</title>
      </Head>

      <GlobalStyle />
      <Component {...pageProps} />
    </MuiThemeProvider>
  )
}

export default dynamic(async () => App, { ssr: false })
