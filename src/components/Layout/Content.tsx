import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'

const Content: React.FC = ({ children }) => {
  const router = useRouter()
  return (
    <>
      {router.pathname === '/' ||
      router.pathname.includes('/bible_version') ||
      router.pathname.includes('/devotional') ? (
        <Box
          mt="55px"
          mb="12px"
          ml={{
            base: '1%',
            xl: '20%',
            lg: '10%'
            // md: '10%',
            // sm: '0%',
            // xs: '1%'
          }}
          mr={{
            base: '1%',
            xl: '20%',
            lg: '10%'
            // md: '10%',
            // sm: '5%',
            // xs: '1%'
          }}
          p="4"
        >
          {children}
        </Box>
      ) : (
        <Box
          mt={{ base: '200px', lg: '55px' }}
          mb="12px"
          ml={{ base: '1%', lg: '25%', xl: '20%' }}
          mr={{ base: '1%', xl: '20%' }}
          p="4"
        >
          {children}
        </Box>
      )}
    </>
  )
}

export default Content
