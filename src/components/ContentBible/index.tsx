// import { Input } from '@chakra-ui/input'
import { Box, Flex, Stack, Text } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  useBreakpointValue
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import NextLink from 'next/link'
import { useForm } from 'react-hook-form'

interface ContentBibleProps {
  data: any
}

const ContentBible: NextPage<ContentBibleProps> = (props) => {
  const { versions, chapterCount, book, testaments } = props.data
  let breakPoint = useBreakpointValue({ base: true, lg: false })
  const breakPointSize = useBreakpointValue({ base: 'xs', sm: 'sm', lg: 'md' })

  const { register, setValue } = useForm()
  const router = useRouter()

  if (router.pathname.includes('/devotional')) {
    breakPoint = true
  }

  const [testament, setTestament] = useState('1')
  const [version, setVersion] = useState('6')
  const [books, setBook] = useState('1')
  const [chapter, setChapter] = useState('1')

  async function handleTestamentSearch(data) {
    const value = data.target.value

    setTestament(value)
    value == 1 ? setBook('1') : setBook('40')
    value == 1 ? setChapter('1') : false
  }
  function handleVersionSearch(data) {
    const value = data.target.value
    setVersion(value)
  }
  function handleBookSearch(data) {
    const value = data.target.value
    setBook(value)
    setChapter('1')
  }
  function handleChapterSearch(data) {
    const value = data.target.value
    setChapter(value)
  }

  useEffect(() => {
    const pathname = router.pathname
    router.push({
      pathname,
      query: {
        version: version,
        testament: testament,
        book: books,
        chapter: chapter
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, testament, books, chapter])
  useEffect(() => {
    setValue('version', router.query.version)
    setValue('book', router.query.book)
    setValue('testament', router.query.testament)
    setValue('chapter', router.query.chapter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])
  return (
    <form>
      <Stack direction={{ base: 'row', lg: 'column' }}>
        {/* <Button>Buscar</Button> */}
        <FormControl>
          <FormLabel
            fontFamily="roboto"
            fontWeight="700"
            fontSize={{ base: 'xs', md: 'md' }}
            hidden={!breakPoint}
          >
            Versão
          </FormLabel>
          <Select
            {...register('version')}
            onChange={handleVersionSearch}
            value={version}
            fontFamily="roboto"
            size={breakPointSize}
          >
            {versions.map((version) => {
              return (
                <option key={version.id} value={version.id}>
                  {version.name}
                </option>
              )
            })}
            {/* <option value="option3">Option 3</option> */}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel
            fontFamily="roboto"
            fontWeight="700"
            hidden={!breakPoint}
            fontSize={{ base: 'xs', md: 'md' }}
          >
            Testamento
          </FormLabel>
          <Select
            {...register('testament')}
            onChange={handleTestamentSearch}
            value={testament}
            fontFamily="roboto"
            size={breakPointSize}
          >
            {testaments.map((testament) => {
              return (
                <option key={testament.id} value={testament.id}>
                  {testament.name}
                </option>
              )
            })}
            {/* <option value="option3">Option 3</option> */}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel
            fontFamily="roboto"
            fontWeight="700"
            hidden={!breakPoint}
            fontSize={{ base: 'xs', md: 'md' }}
          >
            Livro
          </FormLabel>
          <Select
            {...register('book')}
            onChange={handleBookSearch}
            value={books}
            fontFamily="roboto"
            size={breakPointSize}
          >
            {book?.map((book) => {
              return (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              )
            })}
          </Select>
        </FormControl>
        {breakPoint ? (
          <>
            <FormControl>
              <FormLabel
                fontFamily="roboto"
                fontWeight="700"
                fontSize={{ base: 'xs', md: 'md' }}
              >
                Capítulo
              </FormLabel>
              <Select
                {...register('chapter')}
                onChange={handleChapterSearch}
                value={chapter}
                fontFamily="roboto"
                size={breakPointSize}
              >
                {chapterCount?.map((chapter) => {
                  return (
                    <option key={chapter.chapter} value={chapter.chapter}>
                      {chapter.chapter}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
          </>
        ) : (
          <>
            <Text fontFamily="roboto" fontWeight="700" textAlign="center">
              Capítulos
            </Text>
            <Box h="55vh" overflow={'auto'}>
              <Flex
                // bg="green"
                justifyContent="normal"
                alignItems="center"
                flexWrap="wrap"
                ml="3"
                // h="55vh"
              >
                {chapterCount?.map((resp) => {
                  return (
                    <Button
                      // size="sm"
                      isActive={
                        router.query.chapter == resp.chapter ? true : false
                      }
                      variant="ghost"
                      onClick={handleChapterSearch}
                      minW="6"
                      minH="6"
                      h="6"
                      w="6"
                      textAlign="center"
                      m="2"
                      value={resp.chapter}
                      fontFamily="roboto"
                      key={resp.chapter}
                    >
                      {resp.chapter}
                    </Button>
                  )
                })}
              </Flex>
            </Box>
          </>
        )}
      </Stack>
    </form>
  )
}

export default ContentBible
