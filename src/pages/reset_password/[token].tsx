import { useMutation } from '@apollo/client'
import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import LayoutAuthenticating from '../../components/LayoutAuthenticating'
import { RESET_PASSWORD } from '../../graphql/resetPassword'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const ResetPassword: NextPage = () => {
  const router = useRouter()
  const toast = useToast()
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
      toast({
        title: 'Recuperar senha.',
        description: error?.toString().substring(26),
        status: 'warning',
        duration: 5000,
        isClosable: true
      })

      // setError(error.toString().substring(26))
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

      toast({
        title: 'Recuperar senha.',
        description: 'Sua Senha Foi Alterada com sucesso!!',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
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
            <Heading fontFamily={'roboto'} fontSize={'4xl'}>
              RECUPERA????O DE SENHA
            </Heading>
            <Text fontFamily={'roboto'} fontSize={'lg'} color={'gray.600'}>
              A senha deve conter no m??nimo seis caracteres...
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
                    Senha ?? obrigat??ria!
                  </Text>
                )}
                {errors.password?.type === 'minLength' && (
                  <Text color="red.300" fontSize={'sm'}>
                    M??nimo 6 caracteres!
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
                    Confirme a senha ?? obrigat??ria!
                  </Text>
                )}
                {errors.confirmPassword?.type === 'minLength' && (
                  <Text color="red.300" fontSize={'sm'}>
                    M??nimo 6 caracteres!
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
                    <Text mr="2">N??o ?? cadastrado? </Text>
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
    </LayoutAuthenticating>
  )
}

export default ResetPassword
