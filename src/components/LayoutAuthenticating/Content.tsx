import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'

const Content: React.FC = ({ children }) => {
  const router = useRouter()
  const margitTop =
    router.pathname.includes('/terms_of_use') ||
    router.pathname.includes('privacy_police')
      ? // router.pathname.includes('signup')
        true
      : false
  return (
    <>
      {margitTop ? (
        <Box mt="65px">{children}</Box>
      ) : (
        <Box mt="10px">{children}</Box>
      )}
    </>
  )
}

export default Content
