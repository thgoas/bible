import { NextPage } from 'next'
import LayoutAdmin from '../../../components/LayoutAdmin'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast
} from '@chakra-ui/react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  BOOKS,
  CHAPTER_COUNT,
  VERSE,
  VERSES_COUNT
} from '../../../graphql/bible'
import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import {
  EDIT_VERSE_OF_THE_DAY,
  NEW_VERSE_OF_THE_DAY,
  VERSE_OF_THE_DAY_EDIT
} from '../../../graphql/verseOfTheDay'
import Protected from '../../../components/Protected'

const Verses: NextPage = () => {
  const router = useRouter()
  const { params } = router.query

  const { register, setValue, handleSubmit } = useForm()
  const { user } = useAuth()

  const toast = useToast()

  const cleanForm = () => {
    setValue('book_id', '')
    setValue('chapter', '')
    setValue('first_verse', '')
    setValue('end_verse', '')
    setValue('reflection', '')
    setValue('author', '')
    setDataVerse(null)
    setValue('date_publication', '')
  }
  const handleOnSubmit = (value) => {
    setLoading(true)
    const id = params && params[1]
    if (params && params[0] === 'new_verse') {
      newVerseOfTheDay({
        variables: {
          book_id: Number(value.book_id),
          chapter: Number(value.chapter),
          first_verse: Number(value.first_verse),
          end_verse: Number(value.end_verse),
          publication: true,
          user_id: user.id,
          date_publication: value.date_publication,
          author: value.author,
          reflection: value.reflection
        }
      })
    } else {
      editVerseOfTheDay({
        variables: {
          id: Number(id),
          book_id: Number(value.book_id),
          chapter: Number(value.chapter),
          first_verse: Number(value.first_verse),
          end_verse: Number(value.end_verse),
          publication: true,
          user_id: user.id,
          date_publication: value.date_publication,
          author: value.author,
          reflection: value.reflection
        }
      })
    }
    cleanForm()
  }

  const [book_id, setBook_id] = useState(1)
  const [dataBook, setDataBook] = useState(null)
  const [books] = useLazyQuery(BOOKS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data.books.length > 0) {
        setDataBook(data.books)
        chapterCount({
          variables: {
            version_id: 6,
            book_id
          }
        })
      }
    }
  })
  const [chapter_id, setChapter_id] = useState(1)
  const [dataChapter, setDataChapter] = useState(null)
  const [chapterCount] = useLazyQuery(CHAPTER_COUNT, {
    fetchPolicy: 'network-only',

    onCompleted: (data) => {
      if (data.chapterCount) {
        setDataChapter(data.chapterCount)
        versesCount({
          variables: {
            version_id: 6,
            book_id: book_id,
            chapter: chapter_id
          }
        })
      }
    }
  })

  const [dataVerseCount, setDataVerseCount] = useState(null)
  const [versesCount] = useLazyQuery(VERSES_COUNT, {
    fetchPolicy: 'network-only',

    onCompleted: (data) => {
      if (data.versesCount) {
        setDataVerseCount(data.versesCount)
      }
      pageOptions()
    }
  })

  const [dataVerse, setDataVerse] = useState(null)

  const [verse] = useLazyQuery(VERSE, {
    fetchPolicy: 'network-only',

    onCompleted: (data) => {
      setDataVerse(data.verse)
    }
  })

  const handleBook = async (e) => {
    const id = e.target.value
    setBook_id(Number(id))
    await chapterCount({
      variables: {
        version_id: 6,
        book_id: Number(id)
      }
    })
  }

  const handleChapter = async (e) => {
    const id = e.target.value
    setChapter_id(Number(id))
    await versesCount({
      variables: {
        version_id: 6,
        book_id: book_id,
        chapter: Number(id)
      }
    })
  }
  const verses_id = { firstVerse: 1, endVerse: 1 }
  const handleFirstVerse = async (e) => {
    const id = e.target.value
    verses_id.firstVerse = Number(id)
  }
  const handleEndVerse = async (e) => {
    const id = e.target.value
    verses_id.endVerse = Number(id)
    verse({
      variables: {
        version_id: 6,
        chapter: chapter_id,
        book_id,
        first_verse: verses_id.firstVerse,
        end_verse: Number(id)
      }
    })
  }
  const [checkboxValue, setCheckboxValue] = useState(false)
  const handleCheckbox = (e) => {
    const value = e.target.checked
    setCheckboxValue(value)
  }

  useEffect(() => {
    books()
  }, [books])

  const [loading, setLoading] = useState(false)
  const [newVerseOfTheDay] = useMutation(NEW_VERSE_OF_THE_DAY, {
    onCompleted: () => {
      setLoading(false)

      toast({
        description: 'Salvo com sucesso!',
        status: 'success',
        title: 'Versículo diário',
        duration: 5000,
        isClosable: true
      })
    },
    onError: (err) => {
      toast({
        description: err.toString(),
        status: 'error',
        title: 'Versículo diário!',
        duration: 5000,
        isClosable: true
      })
      console.log(err)
      setLoading(false)
    }
  })

  const pageOptions = () => {
    if (params && params[0] !== 'new_verse') {
      const id = params && params[1]
      verseOfTheDayEdit({
        variables: {
          id: Number(id)
        }
      })
    }
  }
  const [dataVerseOfTheDayEdit, setDataVerseOfTheDayEdit] = useState(null)

  const [verseOfTheDayEdit] = useLazyQuery(VERSE_OF_THE_DAY_EDIT, {
    onCompleted: (data) => {
      setDataVerseOfTheDayEdit(data.verseOfTheDayEdit)
    }
  })

  const [editVerseOfTheDay] = useMutation(EDIT_VERSE_OF_THE_DAY, {
    onCompleted: () => {
      setLoading(false)
      toast({
        description: 'Editado com sucesso!',
        status: 'info',
        title: 'Versículo diário',
        duration: 5000,
        isClosable: true
      })
    },
    onError: (err) => {
      toast({
        description: err.toString(),
        status: 'error',
        title: 'Versículo diário!',
        duration: 5000,
        isClosable: true
      })
      console.log(err)
      setLoading(false)
    }
  })

  useEffect(() => {
    if (dataVerseOfTheDayEdit?.reflection) {
      setCheckboxValue(true)
    }
    setValue('book_id', dataVerseOfTheDayEdit?.book.id.toString())
    setValue('chapter', dataVerseOfTheDayEdit?.chapter.toString())
    setValue('first_verse', dataVerseOfTheDayEdit?.first_verse.toString())
    setValue('end_verse', dataVerseOfTheDayEdit?.end_verse.toString())
    setValue('reflection', dataVerseOfTheDayEdit?.reflection)
    setValue('author', dataVerseOfTheDayEdit?.author)
    setDataVerse(null)
    setValue(
      'date_publication',
      dataVerseOfTheDayEdit?.date_publication.substring(0, 10)
    )
  }, [dataVerseOfTheDayEdit, setValue])
  return (
    <Protected>
      <LayoutAdmin>
        <Head>
          <title>
            Hora do Devocional{' '}
            {params === 'new_verse'
              ? 'Criar Versículo diário'
              : 'Editar Versículo diário'}
          </title>
          <meta id="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <Box m="6">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <FormControl isRequired>
                <FormLabel>Livro</FormLabel>
                <Select
                  id="book"
                  {...register('book_id')}
                  onChange={handleBook}
                  //   value={book_id}
                  fontFamily="roboto"
                  placeholder="Selecione um Livro"
                >
                  {dataBook?.map((book) => {
                    return (
                      <option key={book.id} value={book.id}>
                        {book.name}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Capítulo</FormLabel>
                <Select
                  id="chapter"
                  {...register('chapter')}
                  fontFamily={'roboto'}
                  onChange={handleChapter}
                  placeholder="Selecione um capítulo"
                >
                  {dataChapter?.map((r) => {
                    return (
                      <option key={r.chapter} value={r.chapter}>
                        {r.chapter}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Versículos</FormLabel>
                <HStack>
                  <Select
                    id="first_verse"
                    {...register('first_verse')}
                    onChange={handleFirstVerse}
                    fontFamily={'roboto'}
                    placeholder="Do versículo"
                  >
                    {dataVerseCount?.map((r) => {
                      return (
                        <option key={r.verse} value={r.verse}>
                          {r.verse}
                        </option>
                      )
                    })}
                  </Select>
                  <Select
                    id="end_verse"
                    {...register('end_verse')}
                    fontFamily={'roboto'}
                    onChange={handleEndVerse}
                    placeholder="Ao versículo"
                  >
                    {dataVerseCount?.map((r) => {
                      return (
                        <option key={r.verse} value={r.verse}>
                          {r.verse}
                        </option>
                      )
                    })}
                  </Select>
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Publicação</FormLabel>
                <Input
                  id="date_publication"
                  {...register('date_publication')}
                  type="date"
                  // defaultValue={dateNow}
                  // value={dateNow}
                />
              </FormControl>
            </Stack>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Checkbox
                my="6"
                isChecked={checkboxValue}
                onChange={handleCheckbox}
              >
                Criar Reflexão
              </Checkbox>
              <HStack>
                <Button
                  // display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  bg={'blue.400'}
                  color={'white'}
                  isLoading={loading}
                  _hover={{
                    bg: 'blue.500'
                  }}
                  type="submit"
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
            {checkboxValue ? (
              <Stack>
                <FormControl>
                  <FormLabel>Reflexão</FormLabel>
                  <Textarea
                    fontFamily={'roboto'}
                    {...register('reflection')}
                    placeholder="Reflexão"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Autor</FormLabel>
                  <Input
                    fontFamily={'roboto'}
                    type="text"
                    {...register('author')}
                  />
                </FormControl>
              </Stack>
            ) : null}
            <Box my="6" p="4">
              {dataVerse?.map((r) => {
                return (
                  <>
                    <Text fontFamily={'roboto'} key={r.verse}>
                      {r.verse}. {r.text}
                    </Text>
                  </>
                )
              })}
            </Box>
          </form>
        </Box>
      </LayoutAdmin>
    </Protected>
  )
}

export default Verses
