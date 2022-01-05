import { useLazyQuery } from '@apollo/client'
import {
  Box,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/react'
import { format } from 'date-fns'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

import Layout from '../../components/Layout'
import ListTable from '../../components/ListTable'
import Protected from '../../components/Protected'
import { DEVOTIONAL } from '../../graphql/devotional'
import useAuth from '../../hooks/useAuth'

const Devotional: NextPage = () => {
  const [devotional, { data, loading, error }] = useLazyQuery(DEVOTIONAL)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      devotional({
        variables: {
          user_id: user.id
        }
      })
    }
  }, [user])
  return (
    <Protected>
      <Layout leftSideContent={''} leftSideTitle={''}>
        <Head>
          <title>Devocional</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Text mt="6">Olá {user?.name}</Text>
        <Flex>
          <Box
            minW="200"
            minH="200"
            border="1px"
            borderColor="gray.100"
            borderRadius="xl"
            bg="gray.200"
            m="4"
          ></Box>
          <Box
            minW="200"
            minH="200"
            border="1px"
            borderColor="gray.100"
            borderRadius="xl"
            bg="gray.200"
            m="4"
          ></Box>
          <Box
            minW="200"
            minH="200"
            border="1px"
            borderColor="gray.100"
            borderRadius="xl"
            bg="gray.200"
            m="4"
          ></Box>
        </Flex>

        <ListTable variant={true} data={data?.devotional} />

        <Box></Box>
      </Layout>
    </Protected>
  )
}

export default Devotional
