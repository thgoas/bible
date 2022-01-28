import { Box } from '@chakra-ui/layout'
import gql from 'graphql-tag'

import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
// import Router, { useRouter } from 'next/router'
import Error from 'next/error'

import Layout from '../../components/Layout'
import Reflection from '../../components/Reflection'
import VerseOfTheDay from '../../components/VerseOfTheDay'
import client from '../../lib/apolloClient'

const BibleVersion: NextPage = ({ verseOfTheDay, versions }: any) => {
  if (verseOfTheDay.verse.length === 0) {
    return <Error statusCode={404} />
  }

  return (
    <div>
      <Layout leftSideContent={''} leftSideTitle={''}>
        <Head>
          <title>Hora do Devocional</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Box mb="6">
          <VerseOfTheDay data={verseOfTheDay} versions={versions} />
        </Box>
        {verseOfTheDay.reflection ? (
          <Reflection reflection={verseOfTheDay} />
        ) : null}
      </Layout>
    </div>
  )
}

export default BibleVersion

export const getServerSideProps: GetServerSideProps = async (context) => {
  let version_id = 6

  const { id } = context.params

  if (id) {
    version_id = Number(id)
  }

  const { data: dataVerse } = await client.query({
    query: gql`
      query verseOfTheDay($version_id: Int) {
        verseOfTheDay(filter: { version_id: $version_id }) {
          date_publication
          reflection
          author

          verse {
            id
            book {
              name
            }
            version {
              name
            }
            chapter
            verse
            text
          }
        }
      }
    `,
    variables: {
      version_id
    },
    fetchPolicy: 'network-only'
  })

  const { data: dataVersions } = await client.query({
    query: gql`
      query Versions {
        versions {
          id
          name
          creation_date
        }
      }
    `,
    fetchPolicy: 'network-only'
  })

  const { verseOfTheDay } = dataVerse
  const { versions } = dataVersions

  return {
    props: {
      verseOfTheDay,
      versions
    }
  }
}
