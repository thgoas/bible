import { useMutation } from '@apollo/client'
import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Alert,
  AlertIcon,
  CloseButton,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Text,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import LayoutProtected from '../../components/LayoutProtected'
import { RESET_PASSWORD } from '../../graphql/resetPassword'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const ResetPassword: NextPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState(null)

  const { token } = router.query
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const [error, setError] = useState(null)

  const [resetPassword, { data, loading, reset }] = useMutation(RESET_PASSWORD)

  const onSubmit = async (value) => {
    try {
      await resetPassword({
        variables: {
          password: value.password,
          token: token
        }
      })
    } catch (error) {
      console.log(error)

      setError(error.toString().substring(26))
      // throw new Error(error)
      reset()
      setValue('password', '')
      setValue('confirmPassword', '')
    }
  }
  const handlePassword = (value) => {
    const password = value.target.value
    setPassword(password)
  }
  const handleConfirmPassword = (value) => {
    const confirmPassword = value.target.value

    if (password === confirmPassword) {
      setConfirmPassword(true)
    } else {
      setConfirmPassword(false)
    }
  }

  useEffect(() => {
    setValue('password', '')
    setValue('confirmPassword', '')
    if (data?.resetPassword.name) {
      setTimeout(function () {
        router.push('/login')
      }, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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
            <Heading fontFamily={'roboto'} fontSize={'4xl'}>
              RECUPERAÇÃO DE SENHA
            </Heading>
            <Text fontFamily={'roboto'} fontSize={'lg'} color={'gray.600'}>
              A senha deve conter no mínimo seis caracteres...
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
          {data && (
            <Alert status="success">
              <AlertIcon />
              {data?.resetPassword.name ? (
                <Flex flexDirection={'column'}>
                  <Text fontFamily={'roboto'}>
                    Sua Senha Foi Alterada com sucesso!!
                  </Text>
                </Flex>
              ) : null}
              <CloseButton
                onClick={() => reset()}
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
                <FormControl id="password" isRequired>
                  <FormLabel>Senha</FormLabel>
                  <InputGroup>
                    <Input
                      {...register('password', {
                        required: true,
                        minLength: 6
                      })}
                      type={showPassword ? 'text' : 'password'}
                      onChange={handlePassword}
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
                <FormControl id="confirmPassword" isRequired>
                  <FormLabel>Confirme a Senha</FormLabel>
                  <InputGroup>
                    <Input
                      {...register('confirmPassword', {
                        required: true,
                        minLength: 6
                      })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      onChange={handleConfirmPassword}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowConfirmPassword(
                            (showConfirmPassword) => !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {errors.confirmPassword?.type === 'required' && (
                  <Text color="red.300" fontSize={'sm'}>
                    Confirme a senha é obrigatória!
                  </Text>
                )}
                {errors.confirmPassword?.type === 'minLength' && (
                  <Text color="red.300" fontSize={'sm'}>
                    Mínimo 6 caracteres!
                  </Text>
                )}
                {confirmPassword === null ? null : !confirmPassword ? (
                  <Text color="red.300" fontSize={'sm'}>
                    {' '}
                    Senhas diferentes{' '}
                  </Text>
                ) : null}

                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    {/* <Checkbox>Remember me</Checkbox> */}
                    {/* <Link color={'blue.400'}>Recupera senha?</Link> */}
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
                    Enviar
                  </Button>
                  {/* <Box display={'flex'} justifyContent={'center'}>
                    <Text mr="2">Não é cadastrado? </Text>
                    <NextLink href="/signup">
                      <Link color={'blue.400'}>Cadastre-se</Link>
                    </NextLink>
                  </Box> */}
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </LayoutProtected>
  )
}

export default ResetPassword
