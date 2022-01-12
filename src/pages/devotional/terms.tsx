import { Box, Link, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import NextLink from 'next/link'

const Terms: NextPage = () => {
  return (
    <Layout leftSideContent={''} leftSideTitle={''}>
      <Head>
        <title>Termos Devocional</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box>
        <Text
          mt="65px"
          textAlign={'center'}
          as="h3"
          fontSize={'lg'}
          fontWeight={'700'}
        >
          Ops, é preciso fazer{' '}
          <NextLink href={'/login'}>
            <Link color={'blue.400'}>Login</Link>
          </NextLink>
          , caso não tenha cadastro, pode se cadastra{' '}
          <NextLink href={'/signup'}>
            <Link color={'blue.400'}>Aqui</Link>
          </NextLink>{' '}
          é super rápido!!!
        </Text>
      </Box>
    </Layout>
  )
}

export default Terms
