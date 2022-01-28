import { Box, Heading, Spacer, Text } from '@chakra-ui/layout'
import { NextPage } from 'next'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useBreakpointValue } from '@chakra-ui/react'

interface ReflectionProps {
  reflection?: any
}

const Reflection: NextPage<ReflectionProps> = (props) => {
  const data = props.reflection
  const breakPointSize = useBreakpointValue({ base: 'xs', sm: 'sm', lg: 'md' })
  const breakPointFontSize = useBreakpointValue({
    base: 'lg',
    sm: 'xl',
    lg: '2xl'
  })
  return (
    <>
      <Box
        mb="1"
        p="4"
        //   border="1px"
        borderRadius="xl"
        borderColor="#D7D7D7"
        // boxShadow={'xl'}
        //   bg="white"
      >
        <Heading mb="4" fontFamily="Roboto" size="lg">
          Reflexão
        </Heading>{' '}
        <Heading
          fontWeight="400"
          fontStyle="italic"
          fontFamily="serif"
          color="gray.600"
          mb="4"
          size="sm"
        >
          {format(
            new Date(data.date_publication),
            "iiiiiii d 'de' MMMM 'de' yyyy",
            {
              locale: ptBR
            }
          )}
        </Heading>
        <Spacer />
        <Text fontSize={breakPointFontSize} fontFamily="serif">
          {data.reflection}
        </Text>
        <Box mb="2" mt="4" display="flex">
          <Heading fontFamily="Roboto" size={breakPointSize}>
            {data.author}
          </Heading>{' '}
          <Spacer />
        </Box>
      </Box>
    </>
  )
}

export default Reflection
