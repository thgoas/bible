import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex } from '@chakra-ui/layout'
import { Fade } from '@chakra-ui/react'
import { NextPage } from 'next'
import useAuth from '../../hooks/useAuth'
import LeftSide from '../LeftSide'
import RightSide from '../RightSide'
import Content from './Content'
import Head from 'next/head'

import WithSubnavigation from './WithSubnavigation'
import { useEffect } from 'react'
import AdBanner from '../AdBanner'

interface LayoutProps {
  leftSideTitle: any
  leftSideContent: any
}
declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

const Layout: NextPage<LayoutProps> = (props) => {
  // const bg = useColorModeValue('#F3F2EF', '#1A202C')
  const color = useColorModeValue('black', 'gray.300')
  const { user } = useAuth()

  useEffect(() => {
    const ads = document.getElementsByClassName('adsbygoogle').length
    for (let i = 0; i < ads; i++) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {}
    }
  }, [])

  const handleAdSense = () => {
    return <AdBanner />
  }

  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Flex minH="100vh" color={color} direction="column">
        <WithSubnavigation user={user} />
        <Fade in={true}>
          <Flex direction="column" alignItems="center">
            <LeftSide
              content={props.leftSideContent}
              title={props.leftSideTitle}
            />
            <Content>{props.children}</Content>
            <RightSide content={handleAdSense()} title="" />
          </Flex>
        </Fade>
      </Flex>
    </>
  )
}

export default Layout
