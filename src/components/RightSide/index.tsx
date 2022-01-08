import { Box, Heading } from '@chakra-ui/layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

interface RightSideProps {
  title: string
  content: any
}

const RightSide: NextPage<RightSideProps> = (props) => {
  const router = useRouter()
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
          w={{ base: '350px', xl: '18%' }}
          // ml="4"
          mt="70px"
          // border="1px"
          // ml={{ base: '25%', xl: null }}
          // mx={{ base: '35%', xl: '0%' }}
          borderRadius="xl"
          borderColor="#D7D7D7"
          // bg="red"
          // boxShadow="xl"
          pos={{ base: null, xl: 'fixed' }}
          right="1%"
        >
          <Heading>{props.title}</Heading>
          <Box>{props.content}</Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          p="4"
          h="87vh"
          w={{ base: '350px', xl: '18%' }}
          // ml="4"
          mt="70px"
          // border="1px"
          ml={{ base: null, lg: '25%', xl: null }}
          borderRadius="xl"
          borderColor="#D7D7D7"
          // bg="red"
          // boxShadow="xl"
          pos={{ base: null, xl: 'fixed' }}
          right="1%"
        >
          <Heading>{props.title}</Heading>
          <Box>{props.content}</Box>
        </Box>
      )}
    </>
  )
}

export default RightSide
