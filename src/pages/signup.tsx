import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import client, { accessToken } from '../lib/apolloClient'
import LayoutAuthenticating from '../components/LayoutAuthenticating'
import { useRouter } from 'next/router'

const REGISTER_USER = gql`
  mutation registerUser($name: String!, $email: String!, $password: String!) {
    registerUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
      token
      profiles {
        id
        description
      }
    }
  }
`

const SigNup: NextPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm()

  const privacyPolicy = process.env.NEXT_PUBLIC_URL_POLICY
  const terms = process.env.NEXT_PUBLIC_URL_TERMS

  const toast = useToast()

  const [registerUser, { data, loading, reset }] = useMutation(REGISTER_USER)

  const onSubmit = async (value) => {
    try {
      await registerUser({
        variables: {
          name: `${value.firstName} ${value.lastName}`,
          email: value.email,
          password: value.password
        }
      })
    } catch (err) {
      if (err) {
        toast({
          title: 'Error Cadastro.',
          description: err?.toString().substring(19),
          status: 'warning',
          duration: 5000,
          isClosable: true
        })
      }
      console.log(err)
      reset()
    } finally {
      handleClearFields()
    }
  }

  const handleClearFields = () => {
    setValue('firstName', '')
    setValue('lastName', '')
    setValue('email', '')
    setValue('password', '')
  }

  useEffect(() => {
    console.log(data)
    if (data?.registerUser.name) {
      router.push(
        `/registered_successfully/${data.registerUser.name}/${data.registerUser.email}`
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <LayoutAuthenticating>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontFamily={'roboto'}
              fontSize={'4xl'}
              textAlign={'center'}
            >
              Cadastre-se
            </Heading>
            <Text fontFamily={'roboto'} fontSize={'lg'} color={'gray.600'}>
              e aproveite todos os nossos recursos interessantes ✌️
            </Text>
          </Stack>

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>Nome</FormLabel>
                      <Input
                        {...register('firstName', {
                          required: true,
                          minLength: 4
                        })}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Sobrenome</FormLabel>
                      <Input {...register('lastName')} type="text" />
                    </FormControl>
                  </Box>
                </HStack>
                <Box>
                  {errors.firstName?.type === 'required' && (
                    <Text color="red.300" fontSize={'sm'}>
                      Nome é obrigatório!
                    </Text>
                  )}
                  {errors.firstName?.type === 'minLength' && (
                    <Text color="red.300" fontSize={'sm'}>
                      Mínimo 4 caracteres!
                    </Text>
                  )}
                </Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...register('email', { required: true })}
                    type="email"
                  />
                </FormControl>
                {errors.email?.type === 'required' && (
                  <Text color="red.300" fontSize={'sm'}>
                    Email é obrigatório!
                  </Text>
                )}

                <FormControl id="password" isRequired>
                  <FormLabel>Senha</FormLabel>
                  <InputGroup>
                    <Input
                      {...register('password', {
                        required: true,
                        minLength: 6
                      })}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {errors.password?.type === 'required' && (
                  <Text color="red.300" fontSize={'sm'}>
                    Senha é obrigatória!
                  </Text>
                )}
                {errors.password?.type === 'minLength' && (
                  <Text color="red.300" fontSize={'sm'}>
                    Mínimo 6 caracteres!
                  </Text>
                )}
                <Text mt="2" fontSize={'xs'} fontFamily={'roboto'}>
                  Ao clicares em Cadastrar, aceitas os nossos{' '}
                  <Link href={terms} color="blue.400">
                    Termos
                  </Link>
                  , a nossa{' '}
                  <Link href={privacyPolicy} color="blue.400">
                    Política de Dados
                  </Link>{' '}
                  e a nossa{' '}
                  <Link href={privacyPolicy} color="blue.400">
                    Política de cookies.
                  </Link>
                </Text>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Salvando"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500'
                    }}
                    type="submit"
                    isLoading={loading}
                  >
                    Cadastrar
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Já é usuário?{' '}
                    <NextLink href={'/login'}>
                      <Link color={'blue.400'}>Login</Link>
                    </NextLink>
                  </Text>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </LayoutAuthenticating>
  )
}

export default SigNup

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
