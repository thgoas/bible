import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'

const Content: React.FC = ({ children }) => {
  const router = useRouter()
  return (
    <>
      <Box>{children}</Box>
    </>
  )
}

export default Content
