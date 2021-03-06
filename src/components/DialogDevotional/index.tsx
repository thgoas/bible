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
import { useRouter } from 'next/router'
import { NEW_DEVOTIONAL } from '../../graphql/devotional'
import useAuth from '../../hooks/useAuth'

interface DialogModalProps {
  isOpen: boolean
  onClose: () => void
  data: any
  resetFields: () => void
}

const DialogDevotional: NextPage<DialogModalProps> = (props) => {
  const [newDevotional, { data, loading, error, reset }] =
    useMutation(NEW_DEVOTIONAL)
  const { user } = useAuth()
  const router = useRouter()

  const onSubmit = async () => {
    const { data } = props
    const user_id = Number(user.id)
    const chapter = Number(router.query.chapter)
    const book_id = Number(router.query.book)
    const creation_date = new Date()
    try {
      await newDevotional({
        variables: {
          ...data,
          user_id,
          chapter,
          book_id,
          creation_date
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const onClosed = () => {
    props.resetFields()
    reset()
    router.push(
      `/devotional/view_devotional/${data?.newDevotional.user.id}/${data?.newDevotional.id}`
    )
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
          <ModalHeader>Salvar Devocional</ModalHeader>
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
              <Text>Devocional Salvo com sucesso</Text>
            ) : error ? (
              <Text>{error.message.substring(19)}</Text>
            ) : (
              <Text>Deseja salvar o seu devocional?.</Text>
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

                <Button onClick={props.onClose}>N??o</Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DialogDevotional
