import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'

const Terms: NextPage = () => {
  return (
    <Layout leftSideContent={''} leftSideTitle={''}>
      <Head>
        <title>Termos Devocional</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Text textAlign={'center'} as="h1" fontSize={'lg'} fontWeight={'700'}>
        TERMOS PARA ENTRAR NA ÁREA DO DEVOCIONAL
      </Text>

      <Text fontSize={'lg'} mt="4">
        Olá Para entrar na área do devocional é necessário fazer login no nosso
        sistema, caso não tenha um cadastro é fácil se cadastrar!!!
      </Text>
      <Text fontSize={'lg'} my="4">
        Logo acima na barra de menu click no botão{' '}
        <Text as="b">cadastre-se</Text> como mostra na figura abaixo:
      </Text>
      <Flex justifyContent={'center'}>
        <Box>
          <Image
            src="http://localhost:3000/register_buttons.png"
            alt="botões"
          />
        </Box>
      </Flex>

      <Text fontSize={'lg'} my="4">
        Ao clicar no botão <Text as="b">cadastre-se</Text> você será
        redirecionado para a pagina de cadastro como mostra na figura abaixo:
      </Text>
      <Flex justifyContent={'center'}>
        <Box boxSize={'sm'}>
          <Image src="http://localhost:3000/register.png" alt="botões" />
        </Box>
      </Flex>
      <Text fontSize={'lg'} my="4">
        os campos com asteriscos (
        <Text color={'red'} as="b">
          *
        </Text>
        ) são obrigatórios, após o preenchimento dos campos clique em cadastrar.
      </Text>
    </Layout>
  )
}

export default Terms
