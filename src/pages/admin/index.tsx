import { useLazyQuery } from '@apollo/client'
import {
  Box,
  useColorModeValue,
  Stack,
  Flex,
  Text,
  Image
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import LayoutAdmin from '../../components/LayoutAdmin'
import { DASHBOARD } from '../../graphql/dashboard'
import Head from 'next/head'
import Protected from '../../components/Protected'

const Admin: NextPage = () => {
  const [data, setData] = useState(null)
  // const [loading, setLoading] = useState(true)

  const [dashboard] = useLazyQuery(DASHBOARD, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data) {
        // setLoading(false)
        setData(data.dashboard)
      }
    },
    onError: (err) => {
      console.log(err)
    }
  })

  useEffect(() => {
    dashboard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Protected>
      <LayoutAdmin>
        <Head>
          <title>Devocional</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Flex flexWrap={'wrap'}>
          <Box
            minW="200"
            // width={'50%'}
            flexGrow={1}
            minH="130"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            borderRadius="xl"
            boxShadow={'md'}
            // bgGradient="linear(to-t, green.200, pink.500)"
            // bg={useColorModeValue('#F0F3F4', 'none')}
            m="4"
            p="2"
          >
            <Stack>
              <Flex
                fontFamily={'roboto'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text ml="2" fontSize={'sm'} fontWeight={'700'}>
                  Total
                </Text>
                <Image mr="2" boxSize="15px" alt="prayer" src="prayer.png" />
              </Flex>
              <Text
                fontFamily={'roboto'}
                fontWeight={'700'}
                textAlign={'center'}
                fontSize={'5xl'}
              >
                {data ? data.usersCountTotal : '0'}
              </Text>
              <Text fontFamily={'roboto'} textAlign={'center'}>
                Usuários no Banco
              </Text>
            </Stack>
          </Box>

          <Box
            minW="200"
            // width={'50%'}
            flexGrow={1}
            minH="130"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            borderRadius="xl"
            // bg={useColorModeValue('#F0F3F4', 'none')}
            // bgGradient="radial(gray.300, yellow.400, pink.200)"
            boxShadow={'md'}
            m="4"
            p="2"
          >
            <Stack>
              <Flex
                fontFamily={'roboto'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text ml="2" fontSize={'sm'} fontWeight={'700'}>
                  Total
                </Text>
                <Image mr="2" boxSize="15px" alt="prayer" src="prayer.png" />
                {/* <Text>{emoji}</Text> */}
              </Flex>
              <Text
                fontFamily={'roboto'}
                fontWeight={'700'}
                textAlign={'center'}
                fontSize={'5xl'}
              >
                {data ? data.usersCountActive : '0'}
              </Text>
              <Text fontFamily={'roboto'} textAlign={'center'}>
                Usuários Ativos
              </Text>
            </Stack>
          </Box>
          <Box
            minW="200"
            // width={'50%'}
            flexGrow={1}
            minH="130"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            borderRadius="xl"
            // bg={useColorModeValue('#F0F3F4', 'none')}
            // bgGradient="radial(gray.300, yellow.400, pink.200)"
            boxShadow={'md'}
            m="4"
            p="2"
          >
            <Stack>
              <Flex
                fontFamily={'roboto'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text ml="2" fontSize={'sm'} fontWeight={'700'}>
                  Total
                </Text>
                <Image mr="2" boxSize="15px" alt="prayer" src="prayer.png" />
                {/* <Text>{emoji}</Text> */}
              </Flex>
              <Text
                fontFamily={'roboto'}
                fontWeight={'700'}
                textAlign={'center'}
                fontSize={'5xl'}
              >
                {data ? data.usersCountDeleteAccount : '0'}
              </Text>
              <Text fontFamily={'roboto'} textAlign={'center'}>
                Usuários para Deletar
              </Text>
            </Stack>
          </Box>
          <Box
            minW="200"
            // width={'50%'}
            flexGrow={1}
            minH="130"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            borderRadius="xl"
            // bg={useColorModeValue('#F0F3F4', 'none')}
            // bgGradient="radial(gray.300, yellow.400, pink.200)"
            boxShadow={'md'}
            m="4"
            p="2"
          >
            <Stack>
              <Flex
                fontFamily={'roboto'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text ml="2" fontSize={'sm'} fontWeight={'700'}>
                  Total
                </Text>
                <Image mr="2" boxSize="15px" alt="prayer" src="prayer.png" />
                {/* <Text>{emoji}</Text> */}
              </Flex>
              <Text
                fontFamily={'roboto'}
                fontWeight={'700'}
                textAlign={'center'}
                fontSize={'5xl'}
              >
                {data ? data.devotionalCount : '0'}
              </Text>
              <Text fontFamily={'roboto'} textAlign={'center'}>
                Devocionais no banco
              </Text>
            </Stack>
          </Box>
          <Box
            minW="200"
            // width={'50%'}
            flexGrow={1}
            minH="130"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            borderRadius="xl"
            // bg={useColorModeValue('#F0F3F4', 'none')}
            // bgGradient="radial(gray.300, yellow.400, pink.200)"
            boxShadow={'md'}
            m="4"
            p="2"
          >
            <Stack>
              <Flex
                fontFamily={'roboto'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Text ml="2" fontSize={'sm'} fontWeight={'700'}>
                  Total
                </Text>
                <Image mr="2" boxSize="15px" alt="prayer" src="prayer.png" />
                {/* <Text>{emoji}</Text> */}
              </Flex>
              <Text
                fontFamily={'roboto'}
                fontWeight={'700'}
                textAlign={'center'}
                fontSize={'5xl'}
              >
                {data ? data.verseOfDayCount : '0'}
              </Text>
              <Text fontFamily={'roboto'} textAlign={'center'}>
                Versículos diários
              </Text>
            </Stack>
          </Box>
        </Flex>
      </LayoutAdmin>
    </Protected>
  )
}

export default Admin
