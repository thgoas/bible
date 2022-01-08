import { Box } from '@chakra-ui/layout'

const Content: React.FC = ({ children }) => {
  return (
    <>
      <Box p="6" width={'100%'} mt="60px" height={'90vh'}>
        {children}
      </Box>
    </>
  )
}

export default Content
