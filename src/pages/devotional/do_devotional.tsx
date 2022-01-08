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

const DoDevotional: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
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
    console.log(versionId, chapterId, bookId, testamentId)
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

  const buttonNext = () => {
    return (
      <>
        <Flex justifyContent={'end'}>
          <Button
            mt="6"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            onClick={() => setTabIndex(tabIndex + 1)}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500'
            }}
          >
            Próximo
          </Button>
        </Flex>
      </>
    )
  }

  const buttonPrevious = () => {
    return (
      <>
        <Flex justifyContent={'end'}>
          <Button
            mt="6"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            onClick={() => setTabIndex(tabIndex - 1)}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500'
            }}
          >
            Voltar
          </Button>
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
            Depois de você fazer a leitura Bíblica, siga para a meditação
            respondendo estes passos:
          </Text>
          <form onSubmit={handleSubmit(handleSave)}>
            <Box>
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  VERSÍCULO CHAVE
                </Text>{' '}
                (Um versículo chave que te tocou nesse capítulo, ou um texto...,
                você copia pra este primeiro tópico)
              </Text>
              <FormControl isReadOnly>
                <Textarea
                  mt="1"
                  placeholder="Versículo chave"
                  {...register('verse_key', {
                    required: true
                  })}
                  fontSize={'lg'}
                  h="150px"
                />
                {errors.verse_key && (
                  <Text color="red">Campo é Obrigatório!</Text>
                )}
              </FormControl>
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  CARÁTER DE DEUS
                </Text>{' '}
                (Nesse capítulo que você leu, qual caráter de Deus foi
                demonstrado?? Ele foi Misericordioso?? Foi abençoador?? Eterno?
                Livre? Santo? Poderoso? Fiel? Justo?)
              </Text>
              <Textarea
                mt="1"
                placeholder="Caráter de Deus"
                {...register('personality_of_god', { required: true })}
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo é Obrigatório!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  PROMESSAS
                </Text>{' '}
                (Nesse capítulo, Deus te mostrou alguma promessa? se mostrou,
                anota ela nesse tópico)
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
                <Text color="red">Campo é Obrigatório!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  CONDIÇÕES DAS PROMESSAS
                </Text>{' '}
                (Qual a condição pra essa promessa?)
              </Text>
              <Textarea
                mt="1"
                placeholder="Condições das promessas"
                {...register('conditions_promise', {
                  required: true
                })}
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo é Obrigatório!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  APLICAÇÃO PESSOAL
                </Text>{' '}
                (Nesse capítulo que você leu, como você vai aplicar na sua vida
                pessoal? O que você vai acrescentar na sua vida espiritual com
                Deus?)
              </Text>
              <Textarea
                mt="1"
                placeholder="Aplicação pessoal"
                {...register('personal_applications', {
                  required: true
                })}
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo é Obrigatório!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  PECADOS A EVITAR
                </Text>{' '}
                (O que você pode deixar de fazer, que te impede de está mais
                próximo de Deus? Algum pecado, costume??)
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
                <Text color="red">Campo é Obrigatório!</Text>
              )}
            </Box>
            <Box mt="6">
              <Text textAlign={'justify'} fontSize={'lg'}>
                <Text fontSize={'md'} as="b" textAlign={'justify'}>
                  ANOTAÇÕES PESSOAIS
                </Text>{' '}
                (faça um resumo pessoal do estudo...)
              </Text>
              <Textarea
                mt="1"
                placeholder="Anotações pessoais"
                {...register('personal_notes', {
                  required: true
                })}
                h="150px"
                fontSize={'lg'}
              />
              {errors.verse_key && (
                <Text color="red">Campo é Obrigatório!</Text>
              )}
            </Box>
            <Text
              mt="6"
              textAlign={'justify'}
              fontSize={'lg'}
              fontFamily={'Roboto'}
              fontWeight={700}
            >
              Depois, faça uma oração, levando em conta tudo o que você anotou.
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
            <Tab>Antes de começar</Tab>
            <Tab>Leitura</Tab>
            <Tab>Devocional</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text fontFamily={'Roboto'} fontSize={'lg'} fontWeight={'700'}>
                Antes de fazer a leitura Bíblica, faça uma oração legal, pedindo
                entendimento, pra que Deus te mostre o que Ele quer que você
                veja, e te dê forças pra cumprir o seu querer.
              </Text>
              <Text
                mt="6"
                mb="6"
                fontFamily={'Roboto'}
                fontSize={'lg'}
                fontWeight={'700'}
              >
                Abaixo escolha o livro e capítulo:
              </Text>
              {contentBible()}
            </TabPanel>
            <TabPanel h="70vh" overflow={'auto'}>
              <Text
                mt="6"
                mb="6"
                fontFamily={'Roboto'}
                fontSize={'lg'}
                textAlign={'center'}
                fontWeight={'700'}
              >
                Durante a Leitura, Selecione os versículos que te chamam
                atenção.
              </Text>
              <Box w="full%">{bible()}</Box>
            </TabPanel>
            <TabPanel h="70vh" overflow={'auto'}>
              {studyGuide()}
            </TabPanel>
          </TabPanels>
          <Flex>
            <Box>
              {tabIndex === 1 || tabIndex === 2 ? buttonPrevious() : null}
            </Box>
            <Spacer />
            <Box>{tabIndex === 0 || tabIndex === 1 ? buttonNext() : null}</Box>
          </Flex>
        </Tabs>
      ) : (
        <Text>Carregando...</Text>
      )}
    </LayoutAuthenticated>
  )
}

export default DoDevotional
