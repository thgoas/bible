import { Box } from '@chakra-ui/layout'
import gql from 'graphql-tag'

import type { GetStaticProps, NextPage } from 'next'

import Layout from '../components/Layout'
import Page from '../components/Page'
import Reflection from '../components/Reflection'
import VerseOfTheDay from '../components/VerseOfTheDay'
import client from '../lib/apolloClient'

const Home: NextPage = ({ verseOfTheDay, versions }: any) => {
  const text = verseOfTheDay.verse.map((resp) => resp.text)
  const description = `${verseOfTheDay.verse[0].book.name} ${
    verseOfTheDay.verse[0]?.chapter
  }:${verseOfTheDay.verse[0]?.verse}-${
    verseOfTheDay.verse[verseOfTheDay.verse.length - 1]?.verse
  } ${text}`

  return (
    <div>
      <Page title="Versículo de hoje" description={description}>
        <Layout leftSideContent={''} leftSideTitle={''}>
          <Box mb="6">
            <VerseOfTheDay data={verseOfTheDay} versions={versions} />
          </Box>
          {verseOfTheDay.reflection ? (
            <Reflection reflection={verseOfTheDay} />
          ) : null}
        </Layout>
      </Page>
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
          author
          reflection
          date_publication
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
    },
    revalidate: 60
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10 // In seconds
  }
}
