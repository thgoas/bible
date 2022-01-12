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
  Spinner,
  Flex,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { DELETE_DEVOTIONAL, DEVOTIONAL_MINIMUM } from '../../graphql/devotional'

interface DialogModalProps {
  isOpen: boolean
  onClose: () => void
  data: any
  resetFields: () => void
}

const DialogDevotionalDelete: NextPage<DialogModalProps> = (props) => {
  const [deleteDevotional, { data, loading, error, reset }] = useMutation(
    DELETE_DEVOTIONAL,
    {
      refetchQueries: [DEVOTIONAL_MINIMUM, 'devotional']
    }
  )

  const onSubmit = async () => {
    const { data } = props

    try {
      await deleteDevotional({
        variables: {
          user_id: data?.user.id,
          id: data?.id
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const onClosed = () => {
    props.resetFields()
    reset()
  }

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Devocional</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {loading ? (
              <Flex justifyContent={'center'}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            ) : data ? (
              <Text>Devocional excluído com sucesso!!!</Text>
            ) : error ? (
              <Text>{error.message.substring(19)}</Text>
            ) : (
              <Text>Deseja excluir o devocional permanentemente?.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            {error || data ? (
              <Button colorScheme="blue" mr={3} onClick={onClosed}>
                Ok
              </Button>
            ) : (
              <>
                <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                  Sim
                </Button>

                <Button onClick={props.onClose}>Não</Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DialogDevotionalDelete
