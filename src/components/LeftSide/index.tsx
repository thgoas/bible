import { Box, Heading } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

interface LeftSideProps {
  title: string
  content: any
}
const LeftSide: NextPage<LeftSideProps> = (props) => {
  const router = useRouter()
  const bg = useColorModeValue('white', 'gray.800')
  return (
    <>
      {router.pathname === '/' ||
      router.pathname.includes('/bible_version') ||
      router.pathname.includes('/devotional') ? (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          p="4"
          h="87vh"
          w="18%"
          // ml="4"
          mt="70px"
          // border="1px"
          borderRadius="xl"
          borderColor="#D7D7D7"
          // bg="green"
          // boxShadow="xl"
          pos="fixed"
          left="1%"
        >
          <Heading size="md" mb="2" fontFamily="Roboto">
            {props.title}
          </Heading>
          <Box h="80vh">{props.content}</Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          p="4"
          h={{ base: null, lg: '87vh' }}
          w={{ base: null, md: '100%', lg: '25%', xl: '18%' }}
          // ml="4"
          mt={{ base: '60px', lg: '70px' }}
          // border="1px"
          // borderRadius="xl"
          borderColor="#D7D7D7"
          bg={bg}
          // boxShadow="xl"
          pos="fixed"
          left={{ base: null, lg: '1%' }}
          zIndex="4"
        >
          <Heading size="md" mb="2" fontFamily="Roboto">
            {props.title}
          </Heading>
          <Box h={{ base: null, lg: '80vh' }}>{props.content}</Box>
        </Box>
      )}
    </>
  )
}

export default LeftSide
