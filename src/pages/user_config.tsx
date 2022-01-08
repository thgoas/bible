import {
  Avatar,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useState } from 'react'
import DialogUserConfig from '../components/DialogUserConfig'
import LayoutAuthenticated from '../components/LayoutAuthenticated'
import Protected from '../components/Protected'
import useAuth from '../hooks/useAuth'

const UserConfig: NextPage = () => {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [data, setData] = useState('')

  const onClickButton = (value) => {
    setData(value.target.id)
    onOpen()
  }

  return (
    <Protected>
      <LayoutAuthenticated>
        <DialogUserConfig
          user={user}
          data={data}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Flex
            justifyContent={'center'}
            // flexDirection={'column'}
            // alignItems={'center'}
          >
            <HStack spacing="25px">
              <Avatar
                size={'2xl'}
                src={user?.url ? user?.url : null}
                name={user?.name}
              />

              <Stack>
                <Text fontSize={'xl'} fontWeight={'700'}>
                  {user?.name}
                </Text>
                <Text color={'gray.600'}>{user?.email}</Text>
              </Stack>
            </HStack>
          </Flex>

          <Stack mt="10" width={'300px'}>
            <Button id="name" onClick={onClickButton}>
              Alterar Nome
            </Button>
            <Button id="password" onClick={onClickButton}>
              Alterar Senha
            </Button>
            <Button id="image" onClick={onClickButton}>
              Alterar Foto
            </Button>
            <Button id="delete" onClick={onClickButton}>
              Excluir Conta
            </Button>
          </Stack>
        </Flex>
      </LayoutAuthenticated>
    </Protected>
  )
}

export default UserConfig
