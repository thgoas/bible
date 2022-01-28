import { Box } from '@chakra-ui/layout'

const Content: React.FC = ({ children }) => {
  return (
    <>
      <Box
        p={{ base: '1', md: '2' }}
        ml={{ base: 'none', md: '60' }}
        // width={'100%'}
        mt="55px"
        height={'90vh'}
        // bg="red"
      >
        {children}
      </Box>
    </>
  )
}

export default Content
