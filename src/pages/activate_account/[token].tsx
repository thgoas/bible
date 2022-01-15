import { useMutation } from '@apollo/client'
import {
  useColorModeValue,
  Box,
  Flex,
  Text,
  Spinner,
  Button,
  Stack
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LayoutAuthenticated from '../../components/LayoutAuthenticating'

import { ACTIVATE_ACCOUNT } from '../../graphql/activateAccount'

const ActivateAccount: NextPage = () => {
  const router = useRouter()

  const { token } = router.query

  const [activateAccount, { data, error, loading }] =
    useMutation(ACTIVATE_ACCOUNT)

  const handleActivateAccount = async () => {
    try {
      await activateAccount({
        variables: {
          token: token,
          active: true
        }
      })
    } catch (err) {
      console.log(err.toString())
    }
  }

  useEffect(() => {
    if (token) {
      handleActivateAccount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const render = () => {
    if (data?.activateAccount.name) {
      const name = data?.activateAccount.name
      const email = data?.activateAccount.email
      return (
        <Stack>
          <Text fontSize={'lg'}>
            Seja bem Vindo <b>{name}</b>
          </Text>
          <Text fontSize={'lg'}>
            Sua conta de E mail <b>{email}</b> foi confirmada com sucesso!!
          </Text>
          <Text fontSize={'lg'}>Faça Login ou continue navegando no site.</Text>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500'
            }}
            onClick={() => router.push('/login')}
          >
            Entrar
          </Button>
        </Stack>
      )
    }
    if (error) {
      return (
        <>
          <Text mb="4" fontSize={'xl'}>
            Error ao validar E-mail.
          </Text>

          <Text>{error.toString().substring(25)}</Text>
        </>
      )
    }
  }

  return (
    <LayoutAuthenticated>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        height={'100vh'}
        flexDirection={'column'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Box
          fontFamily={'roboto'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            render()
          )}
        </Box>
      </Flex>
    </LayoutAuthenticated>
  )
}

export default ActivateAccount
