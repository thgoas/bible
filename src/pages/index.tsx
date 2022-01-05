import { Box } from '@chakra-ui/layout'
import gql from 'graphql-tag'

import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/Layout'
import Reflection from '../components/Reflection'
import VerseOfTheDay from '../components/VerseOfTheDay'
import client from '../lib/apolloClient'

const Home: NextPage = ({ dataVerse, dataVersions, dataReflection }: any) => {
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
          <VerseOfTheDay data={dataVerse} versions={dataVersions} />
        </Box>
        {dataReflection.reflection?.text ? (
          <Reflection reflection={dataReflection} />
        ) : null}
      </Layout>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const version_id = 6

  const { data: dataVerse } = await client.query({
    query: gql`
      query verseOfTheDay($version_id: Int) {
        verseOfTheDay(filter: { version_id: $version_id }) {
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

  const { data: dataReflection } = await client.query({
    query: gql`
      query Reflection($publication: Boolean) {
        reflection(filter: { publication: $publication }) {
          text
          author
          date_publication
        }
      }
    `,
    variables: {
      publication: true
    },
    fetchPolicy: 'network-only'
  })

  return {
    props: {
      dataVerse,
      dataVersions,
      dataReflection
    },
    revalidate: 60
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10 // In seconds
  }
}
