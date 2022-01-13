import { useMutation } from '@apollo/client'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SINGLE_UPLOAD } from '../../graphql/singleUpload'
import { DELETE_ACCOUNT, EDIT_USER } from '../../graphql/users'
import useAuth from '../../hooks/useAuth'

interface DialogUserConfigProps {
  user?: any
  data: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const DialogUserConfig: NextPage<DialogUserConfigProps> = (props) => {
  const { signOut } = useAuth()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const [singleUpload] = useMutation(SINGLE_UPLOAD, {
    onCompleted: (data) => {
      if (data) {
        setLoading(false)
        props.onClose()
      }
    },
    onError: (err) => {
      console.log('Error', err)
    }
  })
  const [editUser] = useMutation(EDIT_USER, {
    onCompleted: (data) => {
      if (data) {
        setLoading(false)
        props.onClose()
      }
    },
    onError: (err) => {
      console.log('Error', err)
    }
  })

  const [message, setMessage] = useState('')

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    onCompleted: (data) => {
      setLoading(false)
      setMessage(data.deleteAccount.message)
    },
    onError: (err) => {
      console.log('Error', err)
    }
  })

  const handleRenderMessage = () => {
    return <Text>{message}</Text>
  }

  const handleOnSubmit = async (value) => {
    setLoading(true)
    if (value.file) {
      await singleUpload({
        variables: {
          id: Number(user.id),
          email: user.email,
          file: value.file[0]
        }
      })
    } else if (value.name) {
      await editUser({
        variables: {
          id: Number(user.id),
          email: user.email,
          name: value.name + ' ' + value.last_name
        }
      })
    } else if (value.password) {
      await editUser({
        variables: {
          id: Number(user.id),
          email: user.email,
          password: value.password
        }
      })
    } else if (props.data === 'delete') {
      await deleteAccount({
        variables: {
          id: Number(user.id),
          email: user.email
        }
      })
    }
  }

  useEffect(() => {
    if (!props.isOpen) {
      setValue('name', '')
      setValue('last_name', '')
      setValue('password', '')
      setValue('file', '')
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen])
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <ModalHeader>{props.user?.email}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {props.data === 'name' ? (
                <>
                  <FormControl isRequired>
                    <FormLabel>Nome</FormLabel>
                    <Input
                      {...register('name', { required: true, minLength: 4 })}
                    />
                    {errors.name?.type === 'minLength' && (
                      <>
                        <Text color={'red.300'} px="2" fontSize="sm">
                          Mínimo 4 caracteres!!!
                        </Text>
                      </>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Sobrenome</FormLabel>
                    <Input {...register('last_name')} />
                  </FormControl>
                </>
              ) : null}
              {props.data === 'password' ? (
                <>
                  <FormControl isRequired>
                    <FormLabel>Senha</FormLabel>
                    <Input type="password" {...register('password')} />
                  </FormControl>
                </>
              ) : null}
              {props.data === 'image' ? (
                <FormControl>
                  <FormLabel>Foto</FormLabel>
                  <Input type="file" {...register('file')} />
                </FormControl>
              ) : null}
              {props.data === 'delete' && message === '' ? (
                <Text>Deseja Excluir a conta permanentemente?</Text>
              ) : message !== '' ? (
                handleRenderMessage()
              ) : null}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={props.onClose}>
                Cancelar
              </Button>
              {props.data === 'delete' && message === '' ? (
                <Button
                  type="submit"
                  variant="ghost"
                  isLoading={loading}
                  loadingText="Aguarde..."
                >
                  Sim
                </Button>
              ) : message === '' ? (
                <Button
                  type="submit"
                  variant="ghost"
                  isLoading={loading}
                  loadingText="Aguarde..."
                >
                  Salvar
                </Button>
              ) : (
                <Button
                  onClick={() => signOut()}
                  variant="ghost"
                  isLoading={loading}
                  loadingText="Aguarde..."
                >
                  Fechar
                </Button>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DialogUserConfig
