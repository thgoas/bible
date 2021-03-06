import {
  Box,
  Flex,
  Heading,
  Spacer,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ContentBible from '../../components/ContentBible'
import DialogDevotional from '../../components/DialogDevotional'

import LayoutAuthenticated from '../../components/LayoutAuthenticated'
import useBible from '../../hooks/useBible'

import NextLink from 'next/link'

const DoDevotional: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const breakPoint = useBreakpointValue({ base: false, md: true })
  const {
    handleVerses,
    dataVerse,

    handleBook,
    dataBook,
    handleChapterCounts,
    dataChapterCount,
    handleTestaments,
    dataTestaments,
    handleVersions,
    dataVersions
  } = useBible()

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const [versionId, setVersionId] = useState(6)
  const [chapterId, setChapterId] = useState(1)
  const [bookId, setBookId] = useState(1)
  const [testamentId, setTestamentId] = useState(1)
  const [loading, setLoading] = useState(true)
  const [tabIndex, setTabIndex] = useState(0)
  const [dataSave, setDataSave] = useState(null)

  const [datas, setDatas] = useState(null)

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  const handleResetFields = () => {
    reset()
    onClose()
    setTabIndex(0)
    setSelectText([])
  }

  const handleQuery = () => {
    const verses = {
      version_id: versionId,
      book_id: bookId,
      chapter: chapterId
    }
    const books = {
      testament_id: testamentId
    }
    const chapterCounts = {
      version_id: versionId,
      book_id: bookId
    }

    handleVerses(verses)
    handleBook(books)
    handleChapterCounts(chapterCounts)
    handleTestaments()
    handleVersions()
  }

  useEffect(() => {
    const query = router.query
    setVersionId(Number(query.version))
    setChapterId(Number(query.chapter))
    setBookId(Number(query.book))
    setTestamentId(Number(query.testament))
  }, [router.query])

  useEffect(() => {
    handleQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versionId, chapterId, bookId, testamentId])

  useEffect(() => {
    setDatas({
      ...dataVerse,
      ...dataBook,
      ...dataChapterCount,
      ...dataTestaments,
      ...dataVersions
    })
    if (
      dataVerse &&
      dataBook &&
      dataChapterCount &&
      dataTestaments &&
      dataVersions
    ) {
      setLoading(false)
    }
  }, [dataVerse, dataBook, dataChapterCount, dataTestaments, dataVersions])

  const buttonNext = (disable: boolean) => {
    return (
      <>
        <Flex justifyContent={'end'}>
          <Button
            mt="6"
            // display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            onClick={() => setTabIndex(tabIndex + 1)}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500'
            }}
            disabled={disable}
          >
            {!breakPoint ? '>' : 'Pr??ximo '}
          </Button>
        </Flex>
      </>
    )
  }

  const buttonPrevious = (disable) => {
    return (
      <>
        <Flex justifyContent={'end'}>
          <Button
            mt="6"
            // display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            onClick={() => setTabIndex(tabIndex - 1)}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500'
            }}
            disabled={disable}
          >
            {!breakPoint ? '<' : 'voltar'}
          </Button>
        </Flex>
      </>
    )
  }
  const buttonCancel = () => {
    return (
      <>
        <Flex justifyContent={'end'}>
          <NextLink href={'/devotional'}>
            <Button
              mt="6"
              // display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              // onClick={() => setTabIndex(tabIndex - 1)}
              bg={'gray.400'}
              color={'white'}
              _hover={{
                bg: 'red.500'
              }}
            >
              Cancelar
            </Button>
          </NextLink>
        </Flex>
      </>
    )
  }

  const handleSave = (value: any) => {
    const verses = selectText?.map((r) => r.verse).join(', ')

    value.verses = verses
    setDataSave(value)
    onOpen()
  }

  const [selectText, setSelectText] = useState([])

  const handleSelectText = (value: any) => {
    const isSelected = selectText.filter((select) => select.id !== value.id)
    if (isSelected < selectText) {
      setSelectText(isSelected)
    } else {
      setSelectText((selectText) => [...selectText, value])
    }
  }
  useEffect(() => {
    setValue(
      'verse_key',
      selectText?.map((r) => `${r.verse}. ${r.text}`).join(' ')
    )
  }, [selectText, setValue])
  const handleSelectTextFind = (value: any) => {
    return selectText.find((select) => select.id === value.id)
  }

  const bible = () => {
    return (
      <>
        <Box>
          {dataVerse?.verse?.map((verse) => {
            return (
              <>
                <Stack>
                  <Flex alignItems={'center'}>
                    {handleSelectTextFind(verse) ? (
                      <>
                        <Text
                          p="1"
                          m="1"
                          bg={'yellow.200'}
                          key={verse.id}
                          cursor={'pointer'}
                          onClick={() => handleSelectText(verse)}
                          borderRadius={'lg'}
                          fontSize={'lg'}
                          fontWeight={'500'}
                          textAlign={'justify'}
                        >
                          {verse.verse}. {verse.text}
                          {/* <CheckIcon color="green" /> */}
                        </Text>
                      </>
                    ) : (
                      <Text
                        p="1"
                        m="1"
                        key={verse.id}
                        cursor={'pointer'}
                        onClick={() => handleSelectText(verse)}
                        fontSize={'lg'}
                        borderRadius={'lg'}
                        textAlign={'justify'}
                      >
                        {verse.verse}. {verse.text}
                      </Text>
                    )}
                  </Flex>
                </Stack>
              </>
            )
          })}
        </Box>
      </>
    )
  }

  const studyGuide = () => {
    return (
      <>
        <Heading
          as="h1"
          fontFamily={'Roboto'}
          fontWeight={700}
          mb="4"
          textAlign={'center'}
        >
          Guia de Estudo
        </Heading>
        <Stack divider={<StackDivider borderColor="gray.200" />} spacing={6}>
          <Text
            textAlign={'justify'}
            fontSize={'lg'}
            fontFamily={'Roboto'}
            fontWeight={'700'}
          >
            Depois de voc?? fazer a leitura B??blica, siga para a medita????o
            respondendo estes passos:
          </Text>
          <form onSubmit={handleSubmit(handleSave)}>
            <Box>
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  VERS??CULO CHAVE
                </Text>{' '}
                (Um vers??culo chave que te tocou nesse cap??tulo, ou um texto...,
                voc?? copia pra este primeiro t??pico)
              </Text>
              <FormControl isReadOnly>
                <Textarea
                  mt="1"
                  placeholder="Vers??culo chave"
                  {...register('verse_key', {
                    required: true
                  })}
                  fontSize={'lg'}
                  h="150px"
                />
                {errors.verse_key && (
                  <Text color="red">Campo ?? Obrigat??rio!</Text>
                )}
              </FormControl>
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  CAR??TER DE DEUS
                </Text>{' '}
                (Nesse cap??tulo que voc?? leu, qual car??ter de Deus foi
                demonstrado?? Ele foi Misericordioso?? Foi aben??oador?? Eterno?
                Livre? Santo? Poderoso? Fiel? Justo?)
              </Text>
              <Textarea
                mt="1"
                placeholder="Car??ter de Deus"
                {...register('personality_of_god', { required: true })}
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo ?? Obrigat??rio!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  PROMESSAS
                </Text>{' '}
                (Nesse cap??tulo, Deus te mostrou alguma promessa? se mostrou,
                anota ela nesse t??pico)
              </Text>
              <Textarea
                {...register('promise', {
                  required: true
                })}
                mt="1"
                placeholder="Promessa"
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo ?? Obrigat??rio!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  CONDI????ES DAS PROMESSAS
                </Text>{' '}
                (Qual a condi????o pra essa promessa?)
              </Text>
              <Textarea
                mt="1"
                placeholder="Condi????es das promessas"
                {...register('conditions_promise', {
                  required: true
                })}
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo ?? Obrigat??rio!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  APLICA????O PESSOAL
                </Text>{' '}
                (Nesse cap??tulo que voc?? leu, como voc?? vai aplicar na sua vida
                pessoal? O que voc?? vai acrescentar na sua vida espiritual com
                Deus?)
              </Text>
              <Textarea
                mt="1"
                placeholder="Aplica????o pessoal"
                {...register('personal_applications', {
                  required: true
                })}
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo ?? Obrigat??rio!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  PECADOS A EVITAR
                </Text>{' '}
                (O que voc?? pode deixar de fazer, que te impede de est?? mais
                pr??ximo de Deus? Algum pecado, costume??)
              </Text>
              <Textarea
                mt="1"
                placeholder="Pecados a evitar"
                {...register('sins_to_avoid', {
                  required: true
                })}
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo ?? Obrigat??rio!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  ANOTA????ES PESSOAIS
                </Text>{' '}
                (fa??a um resumo pessoal do estudo...)
              </Text>
              <Textarea
                mt="1"
                placeholder="Anota????es pessoais"
                {...register('personal_notes', {
                  required: true
                })}
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo ?? Obrigat??rio!</Text>
              )}
            </Box>
            <Text
              mt="6"
              textAlign={'justify'}
              fontSize={'lg'}
              fontFamily={'Roboto'}
              fontWeight={700}
            >
              Depois, fa??a uma ora????o, levando em conta tudo o que voc?? anotou.
            </Text>
            <Flex>
              <Spacer />
              <Button my="6" type="submit" colorScheme={'pink'}>
                Salvar Devocional
              </Button>
            </Flex>
          </form>
        </Stack>
      </>
    )
  }
  const contentBible = () => {
    if (datas?.versions) {
      const data = { ...datas }
      return <ContentBible data={data} />
    }
    return null
  }
  return (
    <LayoutAuthenticated>
      <Head>
        <title>Devocional</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DialogDevotional
        data={dataSave}
        isOpen={isOpen}
        onClose={onClose}
        resetFields={handleResetFields}
      />

      {!loading ? (
        <Tabs
          index={tabIndex}
          onChange={handleTabsChange}
          mt="4"
          isFitted
          variant="enclosed"
        >
          <TabList mb="1em">
            <Tab>Antes de come??ar</Tab>
            <Tab>Leitura</Tab>
            <Tab>Devocional</Tab>
          </TabList>

          <TabPanels>
            <TabPanel h="65vh" overflow={'auto'}>
              <Text
                textAlign={'justify'}
                fontFamily={'Roboto'}
                fontSize={'lg'}
                fontWeight={'700'}
              >
                Antes de fazer a leitura B??blica, fa??a uma ora????o legal, pedindo
                entendimento, pra que Deus te mostre o que Ele quer que voc??
                veja, e te d?? for??as pra cumprir o seu querer.
              </Text>
              <Text
                mt="6"
                mb="6"
                fontFamily={'Roboto'}
                fontSize={'lg'}
                fontWeight={'700'}
              >
                Abaixo escolha o livro e cap??tulo:
              </Text>
              {contentBible()}
            </TabPanel>
            <TabPanel h="65vh" overflow={'auto'}>
              <Text
                mt="6"
                mb="6"
                fontFamily={'Roboto'}
                fontSize={'lg'}
                textAlign={'center'}
                fontWeight={'700'}
              >
                Durante a Leitura, Selecione os vers??culos que te chamam
                aten????o.
              </Text>
              <Box w="full">{bible()}</Box>
            </TabPanel>
            <TabPanel h="65vh" overflow={'auto'}>
              {studyGuide()}
            </TabPanel>
          </TabPanels>
          <Flex mt="2">
            <Box>
              {tabIndex === 1 || tabIndex === 2
                ? buttonPrevious(false)
                : buttonPrevious(true)}
            </Box>
            <Spacer />
            <Box>{buttonCancel()}</Box>
            <Spacer />
            <Box>
              {tabIndex === 0 || tabIndex === 1
                ? buttonNext(false)
                : buttonNext(true)}
            </Box>
          </Flex>
        </Tabs>
      ) : (
        <Text>Carregando...</Text>
      )}
    </LayoutAuthenticated>
  )
}

export default DoDevotional
