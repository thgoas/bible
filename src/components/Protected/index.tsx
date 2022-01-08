// import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import loadingImg from '../../../public/loading.gif'
import useAuth from '../../hooks/useAuth'
import { Box, Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/react'

const Protected: React.FC = (props) => {
  const { user, loading } = useAuth()
  const router = useRouter()

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

  const isRouter = router.asPath.substring(1)

  if (user && !loading) {
    const isUser = user.profiles.map((p) => p.name)
    // console.log('aqui', user, loading)

    if (isRouter === 'user_config' && user.id) {
      return renderContent()
    } else {
      router.push('/')
    }
    if (user.id) {
      return renderContent()
    } else {
      router.push('/devotional/terms')
    }

    if (!isUser.includes(isRouter)) {
      // console.log('dentro do 2 if')

      router.push('/')
    } else {
      return renderContent()
    }
    // console.log('fim')
    return renderLoading()
  } else if (loading) {
    // console.log('loading')

    return renderLoading()
  } else if (isRouter === 'devotional') {
    // console.log('else')
    router.push('/devotional/terms')
    return null
  } else if (isRouter === 'user_config') {
    // console.log('else')
    router.push('/')
    return null
  } else {
    router.push('/')
    return null
  }
}

export default Protected
