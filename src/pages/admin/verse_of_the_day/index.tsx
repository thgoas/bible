import { useLazyQuery } from '@apollo/client'
import {
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  Image,
  useBreakpointValue,
  Button
} from '@chakra-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import LayoutAdmin from '../../../components/LayoutAdmin'
import ListTableDevotionalAdmin from '../../../components/ListTableDevotionalAdmin'
import { DASHBOARD, VERSES_OF_THE_DAYS } from '../../../graphql/dashboard'
import Protected from '../../../components/Protected'

const VerseOfTheDay: NextPage = () => {
  const variant = useBreakpointValue({ base: false, md: true })
  const size = useBreakpointValue({ base: 'sm', md: 'md' })

  const [data, setData] = useState(null)
  const [dataList, setDataList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dashboard] = useLazyQuery(DASHBOARD, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data) {
        setLoading(false)
        setData(data.dashboard)
      }
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const [versesOfTheDays] = useLazyQuery(VERSES_OF_THE_DAYS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setDataList(data)
    },
    onError: (err) => {
      console.log(err)
    }
  })

  useEffect(() => {
    dashboard()
    versesOfTheDays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Protected>
      <LayoutAdmin>
        <Head>
          <title>Hora do Devocional Administração</title>
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
                <Image
                  mr="2"
                  boxSize="15px"
                  alt="prayer"
                  src={`${process.env.NEXT_PUBLIC_URL}/prayer.png`}
                />
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
              Versículos diários
            </Text>
            <NextLink href={'/admin/verse_of_the_day/new_verse'}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500'
                }}
                isLoading={loading}
                loadingText="Aguarde..."
                size={size}
                //   onClick={'handleOnClick'}
              >
                {size === 'sm' ? 'Novo' : 'Criar Versículos diários'}
              </Button>
            </NextLink>
          </Flex>
          {data?.versesOfTheDays ? (
            <Text fontFamily={'roboto'} fontSize={20} textAlign={'center'}>
              Ops não existe versículos...
            </Text>
          ) : (
            <ListTableDevotionalAdmin
              variant={variant}
              data={dataList?.versesOfTheDays}
            />
          )}
        </Box>
      </LayoutAdmin>
    </Protected>
  )
}

export default VerseOfTheDay
