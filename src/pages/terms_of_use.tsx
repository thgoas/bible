import {
  Box,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next'
import LayoutAuthenticating from '../components/LayoutAuthenticating'
import Page from '../components/Page'

const TermsOfUse: NextPage = () => {
  return (
    <Page
      title="Termos de Uso"
      description="Ao acessar ao site hora do devocional, concorda em cumprir estes termos de serviço, todas as leis e
    regulamentos aplicáveis ​​e concorda que é responsável pelo
    cumprimento de todas as leis locais aplicáveis. Se você não concordar
    com algum desses termos, está proibido de usar ou acessar este site.
    Os materiais contidos neste site são protegidos pelas leis de direitos
    autorais e marcas comerciais aplicáveis"
    >
      <LayoutAuthenticating>
        <Box m="10%">
          <Heading my="4" fontSize={'2xl'}>
            1. Termos
          </Heading>

          <Text>
            Ao acessar ao site{' '}
            <Link color="blue" href="https://horadodevocional.com.br">
              Hora do Devocional
            </Link>
            , concorda em cumprir estes termos de serviço, todas as leis e
            regulamentos aplicáveis ​​e concorda que é responsável pelo
            cumprimento de todas as leis locais aplicáveis. Se você não
            concordar com algum desses termos, está proibido de usar ou acessar
            este site. Os materiais contidos neste site são protegidos pelas
            leis de direitos autorais e marcas comerciais aplicáveis.
          </Text>
          <Heading my="4" fontSize={'2xl'}>
            2. Uso de Licença
          </Heading>
          <Text>
            É concedida permissão para baixar temporariamente uma cópia dos
            materiais {'(informações ou software)'} no site Hora do Devocional ,
            apenas para visualização transitória pessoal e não comercial. Esta é
            a concessão de uma licença, não uma transferência de título e, sob
            esta licença, você não pode:{' '}
          </Text>
          <OrderedList my="4">
            <ListItem ml="6">modificar ou copiar os materiais;</ListItem>
            <ListItem ml="6">
              usar os materiais para qualquer finalidade comercial ou para
              exibição pública {'(comercial ou não comercial)'};
            </ListItem>
            <ListItem ml="6">
              tentar descompilar ou fazer engenharia reversa de qualquer
              software contido no site Hora do Devocional;
            </ListItem>
            <ListItem ml="6">
              remover quaisquer direitos autorais ou outras notações de
              propriedade dos materiais; ou
            </ListItem>
            <ListItem ml="6">
              transferir os materiais para outra pessoa ou {"'espelhe'"} os
              materiais em qualquer outro servidor.
            </ListItem>
          </OrderedList>
          <Text>
            Esta licença será automaticamente rescindida se você violar alguma
            dessas restrições e poderá ser rescindida por Hora do Devocional a
            qualquer momento. Ao encerrar a visualização desses materiais ou
            após o término desta licença, você deve apagar todos os materiais
            baixados em sua posse, seja em formato eletrónico ou impresso.
          </Text>
          <Heading my="4" fontSize={'2xl'}>
            3. Isenção de responsabilidade
          </Heading>
          <OrderedList>
            <ListItem ml="6">
              Os materiais no site da Hora do Devocional são fornecidos{' '}
              {"'como estão'"}. Hora do Devocional não oferece garantias,
              expressas ou implícitas, e, por este meio, isenta e nega todas as
              outras garantias, incluindo, sem limitação, garantias implícitas
              ou condições de comercialização, adequação a um fim específico ou
              não violação de propriedade intelectual ou outra violação de
              direitos.
            </ListItem>
            <ListItem ml="6">
              Além disso, o Hora do Devocional não garante ou faz qualquer
              representação relativa à precisão, aos resultados prováveis ​​ou à
              confiabilidade do uso dos materiais em seu site ou de outra forma
              relacionado a esses materiais ou em sites vinculados a este site
            </ListItem>
          </OrderedList>
          <Heading my="4" fontSize={'2xl'}>
            4. Limitações
          </Heading>
          <Text>
            O Hora do Devocional não analisou todos os sites vinculados ao seu
            site e não é responsável pelo conteúdo de nenhum site vinculado. A
            inclusão de qualquer link não implica endosso por Hora do Devocional
            do site. O uso de qualquer site vinculado é por conta e risco do
            usuário.
          </Text>

          <Heading my="4" as="h2" fontSize={'xl'}>
            Modificações
          </Heading>
          <Text>
            O Hora do Devocional pode revisar estes termos de serviço do site a
            qualquer momento, sem aviso prévio. Ao usar este site, você concorda
            em ficar vinculado à versão atual desses termos de serviço.
          </Text>
          <Heading my="4" as="h2" fontSize={'xl'}>
            Lei aplicável
          </Heading>
          <Text>
            Estes termos e condições são regidos e interpretados de acordo com
            as leis do Hora do Devocional e você se submete irrevogavelmente à
            jurisdição exclusiva dos tribunais naquele estado ou localidade.
          </Text>
        </Box>
      </LayoutAuthenticating>
    </Page>
  )
}

export default TermsOfUse
