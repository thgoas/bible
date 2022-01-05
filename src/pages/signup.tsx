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
  Alert,
  AlertIcon,
  CloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import CreateAccountModal from '../components/CreateAccountModal'
import useAuth from '../hooks/useAuth'
import client, { accessToken } from '../lib/apolloClient'
import LayoutProtected from '../components/LayoutProtected'

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showPassword, setShowPassword] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm()

  const [error, setError] = useState(null)

  const [registerUser, { data, loading }] = useMutation(REGISTER_USER)
  const { user } = useAuth()

  const onSubmit = async (value) => {
    try {
      await registerUser({
        variables: {
          name: `${value.firstName} ${value.lastName}`,
          email: value.email,
          password: value.password
        }
      })
    } catch (error) {
      if (error.toString() === 'Error: EmailError: Email já cadastrado!') {
        setError('Email já Cadastrado!')
        handleClearFields()
      }
      console.log(error.toString())
    } finally {
      handleClearFields()
      if (data) {
        onOpen()
      }
    }
  }

  const handleClearFields = () => {
    setValue('firstName', '')
    setValue('lastName', '')
    setValue('email', '')
    setValue('password', '')
  }

  useEffect(() => {
    if (user?.id) {
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, data])

  return (
    <LayoutProtected>
      <CreateAccountModal isOpen={isOpen} onClose={onClose} data={data} />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontFamily={'Roboto'}
              fontSize={'4xl'}
              textAlign={'center'}
            >
              Cadastre-se
            </Heading>
            <Text fontFamily={'Roboto'} fontSize={'lg'} color={'gray.600'}>
              e aproveite todos os nossos recursos interessantes ✌️
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
    </LayoutProtected>
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
