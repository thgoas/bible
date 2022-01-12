import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex } from '@chakra-ui/layout'
import { Fade } from '@chakra-ui/react'
import { NextPage } from 'next'
import useAuth from '../../hooks/useAuth'
import LeftSide from '../LeftSide'
import RightSide from '../RightSide'
import Content from './Content'

import WithSubnavigation from './WithSubnavigation'

interface LayoutProps {
  leftSideTitle: any
  leftSideContent: any
}

const Layout: NextPage<LayoutProps> = (props) => {
  // const bg = useColorModeValue('#F3F2EF', '#1A202C')
  const color = useColorModeValue('black', 'gray.300')
  const { user } = useAuth()

  return (
    <Flex minH="100vh" color={color} direction="column">
      <WithSubnavigation user={user} />
      <Fade in={true}>
        <Flex direction="column" alignItems="center">
          <LeftSide
            content={props.leftSideContent}
            title={props.leftSideTitle}
          />
          <Content>{props.children}</Content>
          <RightSide content="" title="" />
        </Flex>
      </Fade>
    </Flex>
  )
}

export default Layout
