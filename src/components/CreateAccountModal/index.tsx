import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next'
import Router from 'next/router'

interface CreateAccountModalProps {
  isOpen: boolean
  onClose: () => void
  data: any
}

const CreateAccountModal: NextPage<CreateAccountModalProps> = (props) => {
  const onClosed = () => {
    Router.push('/login')
    props.onClose()
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
          <ModalHeader>Parabéns {props.data?.registerUser.name} </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>
              Agora pode fazer o Login com sua conta de email{' '}
              <Text as="b">{props.data?.registerUser.email}</Text>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClosed}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateAccountModal
