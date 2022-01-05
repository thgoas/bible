import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  //   Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  CloseButton
} from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import client, { accessToken } from '../lib/apolloClient'
import { gql } from '@apollo/client'
import LayoutProtected from '../components/LayoutProtected'

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { signIn, user, loginError } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    await signIn(data)
  }
  useEffect(() => {
    if (loginError?.toString() === 'Error: Usuário ou senha inválido') {
      setError('Usuário ou senha inválido!')
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginError])

  useEffect(() => {
    user?.id && setLoading(false)
  }, [user])

  return (
    <LayoutProtected>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontFamily={'Roboto'} fontSize={'4xl'}>
              Faça Login em sua conta
            </Heading>
            <Text fontFamily={'Roboto'} fontSize={'lg'} color={'gray.600'}>
              para aproveitar todos os nossos recursos{' '}
              <Link color={'blue.400'}>interessantes</Link> ✌️
            </Text>
          </Stack>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
              <CloseButton
                onClick={() => setError(null)}
                position="absolute"
                right="8px"
                top="8px"
              />
            </Alert>
          )}
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    {...register('email', {
                      required: true
                    })}
                    type="email"
                  />
                  {errors.email?.type === 'required' && (
                    <Text fontSize="sm" color="red.300">
                      Email é obrigatório!
                    </Text>
                  )}
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...register('password', {
                      required: true,
                      minLength: 6
                    })}
                    type="password"
                  />
                  {errors.password?.type === 'required' && (
                    <Text fontSize="sm" color="red.300">
                      Senha é obrigatória!
                    </Text>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <Text fontSize="sm" color="red.300">
                      Senha deve ser maior ou igual a 6 caracteres!
                    </Text>
                  )}
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    {/* <Checkbox>Remember me</Checkbox> */}
                    <NextLink href="/forgot_password">
                      <Link color={'blue.400'}>Recupera senha?</Link>
                    </NextLink>
                  </Stack>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500'
                    }}
                    type="submit"
                    isLoading={loading}
                    loadingText="Aguarde..."
                  >
                    Entrar
                  </Button>
                  <Box display={'flex'} justifyContent={'center'}>
                    <Text mr="2">Não é cadastrado? </Text>
                    <NextLink href="/signup">
                      <Link color={'blue.400'}>Cadastre-se</Link>
                    </NextLink>
                  </Box>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </LayoutProtected>
  )
}
export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  accessToken(ctx)
  const { data: dataLoadSession } = await client.query({
    query: gql`
      query loadSession {
        loadSession {
          id
          name
          email
          profiles {
            id
            name
            description
          }
          token
        }
      }
    `
  })
  if (dataLoadSession.loadSession?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
