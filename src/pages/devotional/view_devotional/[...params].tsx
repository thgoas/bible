import { useLazyQuery } from '@apollo/client'
import {
  Heading,
  Stack,
  StackDivider,
  Box,
  Flex,
  Spacer,
  Button,
  Text,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LayoutAuthenticated from '../../../components/LayoutAuthenticated'
import { DEVOTIONAL } from '../../../graphql/devotional'

const ViewDevotional: NextPage = () => {
  const router = useRouter()

  const { params } = router.query
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const [devotional] = useLazyQuery(DEVOTIONAL, {
    onCompleted: (data) => {
      const devotional = data.devotional[0]
      setData(devotional)
      setLoading(false)
    },
    onError: (e) => {
      console.log(e)
    },
    fetchPolicy: 'network-only'
  })

  const handleDevotional = async (id: number, user_id: number) => {
    try {
      await devotional({
        variables: {
          id,
          user_id
        }
      })
    } catch (e) {
      console.log('Error handleDevotional', e)
    }
  }

  useEffect(() => {
    if (params !== undefined && params.length > 0) {
      setLoading(true)
      const id = Number(params[1])
      const user_id = Number(params[0])
      handleDevotional(id, user_id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <LayoutAuthenticated>
        <Box
          height={'80vh'}
          display="flex"
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        </Box>
      </LayoutAuthenticated>
    )
  }

  return (
    <LayoutAuthenticated>
      <Box
        border={'1px'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        borderRadius={'xl'}
        p="4"
        boxShadow={'xl'}
      >
        <Heading
          as="h1"
          fontFamily={'Roboto'}
          fontWeight={700}
          mb="4"
          textAlign={'center'}
        >
          Devocional{' '}
          {data ? format(new Date(data?.creation_date), 'dd/MM/yyyy') : null}
        </Heading>
        <Stack divider={<StackDivider borderColor="gray.200" />} spacing={6}>
          <Box p="2">
            <Text textAlign={'justify'} fontSize={'lg'}>
              <Text fontSize={'md'} as="b" textAlign={'justify'}>
                VERSÍCULO CHAVE
              </Text>
            </Text>
            <Text my="4" textAlign={'justify'} fontSize={'lg'}>
              {data?.verse_key}
            </Text>
          </Box>
          <Box p="2">
            <Text textAlign={'justify'} fontSize={'lg'}>
              <Text fontSize={'md'} as="b" textAlign={'justify'}>
                CARÁTER DE DEUS
              </Text>
            </Text>
            <Text my="4" textAlign={'justify'} fontSize={'lg'}>
              {data?.personality_of_god}
            </Text>
          </Box>
          <Box p="2">
            <Text textAlign={'justify'} fontSize={'lg'}>
              <Text fontSize={'md'} as="b" textAlign={'justify'}>
                PROMESSAS
              </Text>
            </Text>
            <Text my="4" textAlign={'justify'} fontSize={'lg'}>
              {data?.promise}
            </Text>
          </Box>
          <Box p="2">
            <Text textAlign={'justify'} fontSize={'lg'}>
              <Text fontSize={'md'} as="b" textAlign={'justify'}>
                CONDIÇÕES DAS PROMESSAS
              </Text>
            </Text>
            <Text my="4" textAlign={'justify'} fontSize={'lg'}>
              {data?.conditions_promise}
            </Text>
          </Box>
          <Box p="2">
            <Text textAlign={'justify'} fontSize={'lg'}>
              <Text fontSize={'md'} as="b" textAlign={'justify'}>
                APLICAÇÃO PESSOAL
              </Text>
            </Text>
            <Text my="4" textAlign={'justify'} fontSize={'lg'}>
              {data?.personal_applications}
            </Text>
          </Box>
          <Box p="2">
            <Text textAlign={'justify'} fontSize={'lg'}>
              <Text fontSize={'md'} as="b" textAlign={'justify'}>
                PECADOS A EVITAR
              </Text>
            </Text>
            <Text my="4" textAlign={'justify'} fontSize={'lg'}>
              {data?.sins_to_avoid}
            </Text>
          </Box>
          <Box p="2">
            <Text textAlign={'justify'} fontSize={'lg'}>
              <Text fontSize={'md'} as="b" textAlign={'justify'}>
                ANOTAÇÕES PESSOAIS
              </Text>
            </Text>
            <Text my="4" textAlign={'justify'} fontSize={'lg'}>
              {data?.personal_notes}
            </Text>
          </Box>

          <Flex>
            <Spacer />
            <Button
              my="6"
              onClick={() => router.push('/devotional')}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
              loadingText="Aguarde..."
            >
              Voltar
            </Button>
          </Flex>
        </Stack>
      </Box>
    </LayoutAuthenticated>
  )
}

export default ViewDevotional
