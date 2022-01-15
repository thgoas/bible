import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import LayoutAuthenticating from '../../components/LayoutAuthenticating'

const RegisteredSuccessfully: NextPage = () => {
  const router = useRouter()
  const { data } = router.query
  return (
    <LayoutAuthenticating>
      <Flex
        height={'100vh'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Heading fontSize={'2xl'} textAlign={'center'}>
          Cadastro Realizado com Sucesso!!!
        </Heading>

        <Text mt="15px" textAlign={'center'}>
          <b>{data ? data[0] : null}</b> Verifique o E-mail{' '}
          <b>{data ? data[1] : null}</b> e siga as instruções para confirmar seu
          cadastro!
        </Text>
      </Flex>
    </LayoutAuthenticating>
  )
}

export default RegisteredSuccessfully
