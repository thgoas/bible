import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/apolloClient'
import theme from '../styles/theme'
import Head from 'next/head'

import * as gtag from '../lib/gtag'
import Analytics from '../components/Analytics'
// import Fonts from '../styles/fonts'
import { AuthProvider } from '../contexts/AuthContext'
import { BibleProvider } from '../contexts/BibleContext'

import { DefaultSeo } from 'next-seo'
import { SEO } from './../../next-seo-config'

import '@fontsource/roboto'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <DefaultSeo {...SEO} />
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          {/* <Fonts /> */}
          <AuthProvider>
            <BibleProvider>
              <Head>
                <link rel="hora do devocional icon" href="/favicon.ico" />
              </Head>
              <Component {...pageProps} />
            </BibleProvider>
          </AuthProvider>
          <Analytics />
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
