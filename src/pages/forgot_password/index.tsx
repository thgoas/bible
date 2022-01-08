import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  useColorModeValue,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import LayoutAuthenticating from '../../components/LayoutAuthenticating'
import { useMutation } from '@apollo/client'
import { FORGOT_PASSWORD } from '../../graphql/forgotPassword'

const ForgotPassword: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const [error, setError] = useState(null)

  const [forgotPassword, { data, loading, reset }] =
    useMutation(FORGOT_PASSWORD)

  const onSubmit = async (value) => {
    try {
      await forgotPassword({
        variables: { ...value }
      })
    } catch (error) {
      console.log(error)
      setError(error)
      // throw new Error(error)
    }
  }

  useEffect(() => {
    setValue('email', '')
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
              RECUPERAÇÃO DE SENHA
            </Heading>
            <Text fontFamily={'roboto'} fontSize={'lg'} color={'gray.600'}>
              Enviaremos um e-mail com um link para que você possa definir uma
              nova senha.
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
              {data?.forgotPassword.message}
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
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
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
    </LayoutAuthenticating>
  )
}
export default ForgotPassword
