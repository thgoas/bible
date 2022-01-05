// import Image from 'next/image'
import Head from 'next/head'
import Router from 'next/router'
// import loadingImg from '../../../public/loading.gif'
import useAuth from '../../hooks/useAuth'
import { Box, Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/react'

const Protected: React.FC = (props) => {
  const { user, loading } = useAuth()

  function renderContent() {
    return (
      <>
        <Head>
          {/* <script 
                        dangerouslySetInnerHTML={{
                            __html:`
                                if(!document.cookie?.includes("akpha.token")){
                                    window.location.href= "/login"
                                }
                            `
                        }}
                    /> */}
        </Head>
        {props.children}
      </>
    )
  }

  function renderLoading() {
    return (
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Box>
          {/* <Image src={loadingImg} alt="Carregando..." />
           */}

          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      </Flex>
    )
  }
  if (user && !loading) {
    // console.log('aqui', user, loading)
    const isRouter = Router.asPath.substring(1)
    const isUser = user.profiles.map((p) => p.name)

    if (isRouter === 'comercial') {
      // console.log('dentro do 1 if')
      // console.log(isUser)
      const admin = isUser.includes('admin')
      const commercial = isUser.includes('commercial')

      if (admin || commercial) {
        return renderContent()
      } else {
        Router.push('/')
      }
    }

    if (user.id) {
      return renderContent()
    } else {
      Router.push('/devotional/terms')
    }

    if (!isUser.includes(isRouter)) {
      // console.log('dentro do 2 if')

      Router.push('/')
    } else {
      return renderContent()
    }
    // console.log('fim')
    return renderLoading()
  } else if (loading) {
    // console.log('loading')

    return renderLoading()
  } else {
    // console.log('else')
    Router.push('/devotional/terms')
    return null
  }
}

export default Protected
