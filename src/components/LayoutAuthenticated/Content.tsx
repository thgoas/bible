import { Box } from '@chakra-ui/layout'

const Content: React.FC = ({ children }) => {
  return (
    <>
      <Box p={{ base: '1', md: '2' }} width={'100%'} mt="55px">
        {children}
      </Box>
    </>
  )
}

export default Content
