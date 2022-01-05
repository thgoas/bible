import { Box, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/layout'
// import { versiculos_dia } from '../../data'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
// import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Select } from '@chakra-ui/select'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useBreakpointValue } from '@chakra-ui/react'

interface VerseOfTheDayProps {
  data?: any
  versions?: any
}
const VerseOfTheDay: NextPage<VerseOfTheDayProps> = (props) => {
  const router = useRouter()
  const breakPointSize = useBreakpointValue({ base: 'xs', sm: 'sm', lg: 'md' })
  const breakPointFontSize = useBreakpointValue({
    base: 'lg',
    sm: 'xl',
    lg: '2xl'
  })

  const [versionId, setVersionId] = useState<number>()
  const [data, setData] = useState<any>()

  const handleChangeVersion = (data: any) => {
    const value = Number(data.target.value)

    router.push(`/bible_version/${value}`)
    // router.reload()
  }

  const bibleVersion = () => {
    return (
      <Stack>
        <Select
          value={versionId}
          onChange={handleChangeVersion}
          variant="unstyled"
          fontFamily="roboto"
          size={breakPointSize}
        >
          {props.versions?.versions.map((resp) => {
            return (
              <option key={resp.id} value={resp.id}>
                {resp.name}
              </option>
            )
          })}
        </Select>
      </Stack>
    )
  }

  useEffect(() => {
    setData(props.data.verseOfTheDay)
    if (router.query.id) {
      setVersionId(Number(router.query.id))
    } else {
      setVersionId(6)
    }

    // verseOfTheDay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, data])

  return (
    <>
      <Box
        mb="1"
        p="4"
        // border="1px"
        borderRadius="xl"
        borderColor="#D7D7D7"
        // boxShadow={'xl'}
        // bg="white"
      >
        <Heading as="h1" mb="4" fontFamily="roboto" size="lg">
          Versículo de Hoje
        </Heading>{' '}
        <Heading
          as="h2"
          fontWeight="400"
          fontStyle="italic"
          fontFamily="serif"
          color="gray.600"
          mb="2"
          size="sm"
        >
          {format(new Date(), "iiiiiii d 'de' MMMM 'de' yyyy", {
            locale: ptBR
          })}
        </Heading>
        <Spacer />
        {data
          ? data.map((r) => {
              return (
                <Text
                  key={r.id}
                  fontSize={breakPointFontSize}
                  fontFamily="serif"
                >
                  {' '}
                  {r.text}{' '}
                </Text>
              )
            })
          : null}
        <Box
          mb="2"
          mt="6"
          display="flex"
          alignItems="center"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Heading fontFamily="roboto" size="sm" mb={{ base: '4', md: '0' }}>
            {data ? data[0].book.name : null} {data ? data[0].chapter : null}:{' '}
            {data ? data[0].verse : null}-{data ? data.length : null}
          </Heading>
          <Spacer />
          <Flex alignItems="center">
            <Heading fontFamily="roboto" size={breakPointSize} mr="4">
              Versão:
            </Heading>
            {bibleVersion()}
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default VerseOfTheDay
