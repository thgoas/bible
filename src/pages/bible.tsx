import { Box, Flex, Heading } from '@chakra-ui/layout'
import { GetServerSideProps, NextPage } from 'next'
import { Button, Text, Spacer, useBreakpointValue } from '@chakra-ui/react'
import Head from 'next/head'

import ContentBible from '../components/ContentBible'
import Layout from '../components/Layout'

import client from '../lib/apolloClient'
import { useRouter } from 'next/router'

import {
  BOOK,
  CHAPTER_COUNT,
  TESTAMENTS,
  VERSE,
  VERSIONS
} from '../graphql/bible'

interface BibleProps {
  data: any
}

const Bible: NextPage<BibleProps> = (props) => {
  const router = useRouter()

  const breakPointBoolean = useBreakpointValue({ base: true, md: false })
  const breakPointFontSize = useBreakpointValue({
    base: 'lg',
    sm: 'xl',
    lg: '2xl'
  })

  const contentBible = () => {
    return <ContentBible data={props.data} />
  }

  const handleButtonReturn = () => {
    const chapter = props.data.chapterCount[0].chapter

    const books = props.data.book[0].id
    const testament = props.data.testaments[0].id

    if (Number(router.query.chapter) > chapter) {
      router.push({
        pathname: router.pathname,

        query: {
          ...router.query,
          chapter: Number(router.query.chapter) - 1
        }
      })
    } else if (Number(router.query.book) > books) {
      router.push({
        pathname: router.pathname,

        query: {
          ...router.query,
          chapter: 1,
          book: Number(router.query.book) - 1
        }
      })
    } else if (Number(router.query.testament) > testament) {
      router.push({
        pathname: router.pathname,

        query: {
          ...router.query,
          chapter: 1,
          book: Number(router.query.book) - 1,
          testament: Number(router.query.testament) - 1
        }
      })
    }
  }

  const handleButtonNext = () => {
    const chapter = props.data.chapterCount.length
    const books = props.data.book.length
    const testament = props.data.testaments.length

    if (Number(router.query.chapter) < chapter) {
      router.push({
        pathname: router.pathname,

        query: {
          ...router.query,
          chapter: Number(router.query.chapter) + 1
        }
      })
    } else if (Number(router.query.book) < books) {
      router.push({
        pathname: router.pathname,

        query: {
          ...router.query,
          chapter: 1,
          book: Number(router.query.book) + 1
        }
      })
    } else if (Number(router.query.testament) < testament) {
      router.push({
        pathname: router.pathname,

        query: {
          ...router.query,
          chapter: 1,
          book: Number(router.query.book) + 1,
          testament: Number(router.query.testament) + 1
        }
      })
    }
  }
  return (
    <Layout leftSideContent={contentBible()} leftSideTitle={'Bíblia Sagrada'}>
      <Head>
        <title>Biblia Online</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex
        flexDirection="column"
        // mb="1"
        p="4"
        display="flex "
        // border="1px"
        borderRadius="xl"
        // borderColor="#D7D7D7"
        // boxShadow={'xl'}
        // bg="white"
      >
        <Heading fontSize="md" as="h3" fontFamily="Roboto">
          {props.data.verse[0]?.version.name}
        </Heading>
        <Heading as="h1" fontFamily="Roboto" mb="4">
          {props.data.verse[0]?.book.name} {props.data.verse[0]?.chapter}
        </Heading>

        <Box>
          {props.data.verse?.map((resp) => {
            return (
              <Text
                key={resp.id}
                fontSize={breakPointFontSize}
                fontFamily="serif"
                textAlign={'justify'}
              >
                {resp.verse}. {resp.text}
              </Text>
            )
          })}

          <Flex mt="4" alignItems="center">
            {!breakPointBoolean ? (
              <Button
                onClick={handleButtonReturn}
                disabled={props.data.verse[0]?.chapter - 1 === 0 ? true : false}
              >
                {'<'} {props.data.verse[0]?.book.name}{' '}
                {props.data.verse[0]?.chapter - 1 === 0
                  ? null
                  : props.data.verse[0]?.chapter - 1}
              </Button>
            ) : (
              <Button
                onClick={handleButtonReturn}
                disabled={props.data.verse[0]?.chapter - 1 === 0 ? true : false}
              >
                {'<'}
              </Button>
            )}
            <Spacer />
            <Text fontFamily="Roboto" fontSize={breakPointFontSize}>
              {props.data.verse[0]?.book.name} {props.data.verse[0]?.chapter}
            </Text>
            <Spacer />
            {!breakPointBoolean ? (
              <Button
                onClick={handleButtonNext}
                disabled={
                  props.data.chapterCount.length <
                  props.data.verse[0]?.chapter + 1
                    ? true
                    : false
                }
              >
                {props.data.chapterCount.length <
                props.data.verse[0]?.chapter + 1
                  ? props.data.verse[0]?.book.name
                  : `${props.data.verse[0]?.book.name}  ${
                      Number(props.data.verse[0]?.chapter) + 1
                    } >`}
              </Button>
            ) : (
              <Button
                onClick={handleButtonNext}
                disabled={
                  props.data.chapterCount.length <
                  props.data.verse[0]?.chapter + 1
                    ? true
                    : false
                }
              >
                {'>'}
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </Layout>
  )
}

export default Bible

export const getServerSideProps: GetServerSideProps = async (context) => {
  let version = 6
  let books = 1
  let chapter = 1
  let testament = 1

  if (context.query.version) {
    version = Number(context.query.version)
  }
  if (context.query.book) {
    books = Number(context.query.book)
  }
  if (context.query.chapter) {
    chapter = Number(context.query.chapter)
  }
  if (context.query.testament) {
    testament = Number(context.query.testament)
  }

  const { data: verse } = await client.query({
    query: VERSE,
    variables: {
      version_id: version,
      book_id: books,
      chapter: chapter
    },
    fetchPolicy: 'network-only'
  })

  const { data: chapterCount } = await client.query({
    query: CHAPTER_COUNT,
    variables: {
      version_id: version,
      book_id: books
      // chapter: chapter
    },
    fetchPolicy: 'network-only'
  })

  const { data: versions } = await client.query({
    query: VERSIONS,
    fetchPolicy: 'network-only'
  })

  const { data: testaments } = await client.query({
    query: TESTAMENTS,
    fetchPolicy: 'network-only'
  })

  const { data: book } = await client.query({
    query: BOOK,
    variables: {
      testament_id: testament
    },
    fetchPolicy: 'network-only'
  })

  return {
    props: {
      data: {
        ...verse,
        ...versions,
        ...testaments,
        ...book,
        ...chapterCount
      }
    }
  }
}
