import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex } from '@chakra-ui/layout'
import { Fade } from '@chakra-ui/react'
import { NextPage } from 'next'
import useAuth from '../../hooks/useAuth'

import Content from './Content'

import WithSubnavigation from './WithSubnavigation'

const LayoutAuthenticating: NextPage = (props) => {
  // const bg = useColorModeValue('#F3F2EF', '#1A202C')
  const color = useColorModeValue('black', 'gray.300')
  const { user } = useAuth()

  return (
    <Flex minH="100vh" color={color} direction="column">
      <WithSubnavigation user={user} />
      <Fade in={true}>
        <Content>{props.children}</Content>
      </Fade>
    </Flex>
  )
}

export default LayoutAuthenticating
