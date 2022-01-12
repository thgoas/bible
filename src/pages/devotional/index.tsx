import { useLazyQuery } from '@apollo/client'
import { Box, Flex, Stack, Text } from '@chakra-ui/layout'
import {
  Button,
  Image,
  useBreakpointValue,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import LayoutAuthenticated from '../../components/LayoutAuthenticated'
import ListTable from '../../components/ListTable'
import Protected from '../../components/Protected'
import { DEVOTIONAL_MINIMUM } from '../../graphql/devotional'
import useAuth from '../../hooks/useAuth'

import { happyOne, happyTree, happyTwo, sad } from '../../utils/emoji'

import NextLink from 'next/link'

const Devotional: NextPage = () => {
  const toast = useToast()
  const [devotional, { data, loading }] = useLazyQuery(DEVOTIONAL_MINIMUM, {
    fetchPolicy: 'network-only'
  })
  const { user } = useAuth()
  const [emoji, setEmoji] = useState(sad)
  const variant = useBreakpointValue({ base: false, md: true })
  const size = useBreakpointValue({ base: 'sm', md: 'md' })

  const handleOnClick = () => {
    console.log(data)
    if (data?.devotional[0]?.amount_day >= 3) {
      toast({
        title: 'Limite de Devocionais.',
        description:
          'Desculpe, só podemos disponibilizar três devocionais por dia!!!',
        status: 'info',
        duration: 9000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    if (user) {
      devotional({
        variables: {
          user_id: user.id
        }
      })
    }
  }, [user, devotional])

  useEffect(() => {
    const amount_day = Number(data?.devotional[0]?.amount_day)
    if (amount_day === 0 || amount_day === null) {
      setEmoji(sad)
    } else if (amount_day === 1) {
      setEmoji(happyOne)
    } else if (amount_day === 2) {
      setEmoji(happyTwo)
    } else if (amount_day >= 3) {
      setEmoji(happyTree)
    }
  }, [data])

  return (
    <Protected>
      <LayoutAuthenticated>
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
                {data?.devotional[0]?.amount ? data.devotional[0].amount : '0'}
              </Text>
              <Text fontFamily={'roboto'} textAlign={'center'}>
                Devocionais
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
                  Hoje
                </Text>
                <Image mr="2" boxSize="15px" alt="prayer" src="prayer.png" />
                <Text>{emoji}</Text>
              </Flex>
              <Text
                fontFamily={'roboto'}
                fontWeight={'700'}
                textAlign={'center'}
                fontSize={'5xl'}
              >
                {data?.devotional[0]?.amount_day
                  ? data.devotional[0]?.amount_day
                  : '0'}
              </Text>
              <Text fontFamily={'roboto'} textAlign={'center'}>
                Devocionais
              </Text>
            </Stack>
          </Box>
        </Flex>
        <Box
          border="1px"
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          borderRadius="xl"
          // bg={useColorModeValue('#F0F3F4', 'none')}
          // bgGradient="radial(gray.300, yellow.400, pink.200)"
          boxShadow={'md'}
          m="4"
          p="2"
        >
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text
              // m="4"
              p="2"
              fontFamily={'roboto'}
              fontSize={'25px'}
              fontWeight={'700'}
            >
              Devocionais
            </Text>
            <NextLink
              href={
                data?.devotional[0]?.amount_day >= 3
                  ? '/devotional'
                  : '/devotional/do_devotional'
              }
            >
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500'
                }}
                isLoading={loading}
                loadingText="Aguarde..."
                size={size}
                onClick={handleOnClick}
              >
                {size === 'sm' ? 'Novo' : 'Fazer devocional'}
              </Button>
            </NextLink>
          </Flex>
          <ListTable variant={variant} data={data?.devotional} />
        </Box>

        <Box></Box>
      </LayoutAuthenticated>
    </Protected>
  )
}

export default Devotional
