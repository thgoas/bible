import {
  Box,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { NextPage } from 'next'
import LayoutAuthenticating from '../components/LayoutAuthenticating'
import Page from '../components/Page'

const PrivacyPolice: NextPage = () => {
  return (
    <Page
      title="Política de privacidade"
      description="A sua privacidade é importante para nós. É política do Hora do
    Devocional respeitar a sua privacidade em relação a qualquer
    informação sua que possamos coletar no site hora do devocional"
    >
      <LayoutAuthenticating>
        <Box m="10%">
          <Heading my="4" fontSize={'2xl'}>
            Política Privacidade
          </Heading>
          <Stack>
            <Text>
              A sua privacidade é importante para nós. É política do Hora do
              Devocional respeitar a sua privacidade em relação a qualquer
              informação sua que possamos coletar no site{' '}
              <Link color="blue" href="https://horadodevocional.com.br">
                Hora do Devocional
              </Link>
              , e outros sites que possuímos e operamos.
            </Text>
            <Text>
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios
              justos e legais, com o seu conhecimento e consentimento. Também
              informamos por que estamos coletando e como será usado.{' '}
            </Text>
            <Text>
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados,
              protegemos dentro de meios comercialmente aceitáveis ​​para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.
            </Text>
            <Text>
              Não compartilhamos informações de identificação pessoal
              publicamente ou com terceiros, exceto quando exigido por lei.
            </Text>
            <Text>
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas{' '}
              <Link color="blue">políticas de privacidade</Link>.
            </Text>
            <Text>
              Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados.
            </Text>
            <Text>
              O uso continuado de nosso site será considerado como aceitação de
              nossas práticas em torno de privacidade e informações pessoais. Se
              você tiver alguma dúvida sobre como lidamos com dados do usuário e
              informações pessoais, entre em contacto conosco.
            </Text>
          </Stack>
          <Heading my="4" fontSize={'2xl'}>
            Política de Cookies Hora do Devocional
          </Heading>
          <Heading mb="4" as="h3" fontSize={'xl'}>
            O que são cookies?
          </Heading>
          <Text>
            Como é prática comum em quase todos os sites profissionais, este
            site usa cookies, que são pequenos arquivos baixados no seu
            computador, para melhorar sua experiência. Esta página descreve
            quais informações eles coletam, como as usamos e por que às vezes
            precisamos armazenar esses cookies. Também compartilharemos como
            você pode impedir que esses cookies sejam armazenados, no entanto,
            isso pode fazer o downgrade ou
            {'quebrar'} certos elementos da funcionalidade do site.
          </Text>
          <Heading my="4" as="h3" fontSize={'xl'}>
            Como usamos os cookies?
          </Heading>
          <Text>
            Utilizamos cookies por vários motivos, detalhados abaixo.
            Infelizmente, na maioria dos casos, não existem opções padrão do
            setor para desativar os cookies sem desativar completamente a
            funcionalidade e os recursos que eles adicionam a este site. É
            recomendável que você deixe todos os cookies se não tiver certeza se
            precisa ou não deles, caso sejam usados ​​para fornecer um serviço
            que você usa.
          </Text>
          <Heading my="4" as="h3" fontSize={'xl'}>
            Desativar cookies
          </Heading>
          <Text>
            Você pode impedir a configuração de cookies ajustando as
            configurações do seu navegador (consulte a Ajuda do navegador para
            saber como fazer isso). Esteja ciente de que a desativação de
            cookies afetará a funcionalidade deste e de muitos outros sites que
            você visita. A desativação de cookies geralmente resultará na
            desativação de determinadas funcionalidades e recursos deste site.
            Portanto, é recomendável que você não desative os cookies.
          </Text>
          <Heading my="4" as="h3" fontSize={'xl'}>
            Cookies que definimos
          </Heading>
          <UnorderedList spacing={6}>
            <ListItem ml="6">
              Cookies relacionados à conta
              <br />
              <br /> Se você criar uma conta connosco, usaremos cookies para o
              gerenciamento do processo de inscrição e administração geral.
              Esses cookies geralmente serão excluídos quando você sair do
              sistema, porém, em alguns casos, eles poderão permanecer
              posteriormente para lembrar as preferências do seu site ao sair.
              <br />
              <br />
            </ListItem>

            <ListItem ml="6">
              Cookies relacionados ao login
              <br />
              <br /> Utilizamos cookies quando você está logado, para que
              possamos lembrar dessa ação. Isso evita que você precise fazer
              login sempre que visitar uma nova página. Esses cookies são
              normalmente removidos ou limpos quando você efetua logout para
              garantir que você possa acessar apenas a recursos e áreas
              restritas ao efetuar login.
              <br />
              <br />
            </ListItem>
            <ListItem ml="6">
              Cookies relacionados a boletins por e-mail
              <br />
              <br /> Este site oferece serviços de assinatura de boletim
              informativo ou e-mail e os cookies podem ser usados ​​para lembrar
              se você já está registrado e se deve mostrar determinadas
              notificações válidas apenas para usuários inscritos / não
              inscritos.
              <br />
              <br />
            </ListItem>
            <ListItem ml="6">
              Pedidos processando cookies relacionados
              <br />
              <br /> Este site oferece facilidades de comércio eletrônico ou
              pagamento e alguns cookies são essenciais para garantir que seu
              pedido seja lembrado entre as páginas, para que possamos
              processá-lo adequadamente.
              <br />
              <br />
            </ListItem>
            <ListItem ml="6">
              Cookies relacionados a pesquisas
              <br />
              <br /> Periodicamente, oferecemos pesquisas e questionários para
              fornecer informações interessantes, ferramentas úteis ou para
              entender nossa base de usuários com mais precisão. Essas pesquisas
              podem usar cookies para lembrar quem já participou numa pesquisa
              ou para fornecer resultados precisos após a alteração das páginas.
              <br />
              <br />
            </ListItem>
            <ListItem ml="6">
              Cookies relacionados a formulários
              <br />
              <br /> Quando você envia dados por meio de um formulário como os
              encontrados nas páginas de contacto ou nos formulários de
              comentários, os cookies podem ser configurados para lembrar os
              detalhes do usuário para correspondência futura.
              <br />
              <br />
            </ListItem>
            <ListItem ml="6">
              Cookies de preferências do site
              <br />
              <br /> Para proporcionar uma ótima experiência neste site,
              fornecemos a funcionalidade para definir suas preferências de como
              esse site é executado quando você o usa. Para lembrar suas
              preferências, precisamos definir cookies para que essas
              informações possam ser chamadas sempre que você interagir com uma
              página for afetada por suas preferências.
              <br />
            </ListItem>
          </UnorderedList>
          <Heading my="4" as="h3" fontSize={'xl'}>
            Cookies de Terceiros
          </Heading>
          <Text mb="4">
            Em alguns casos especiais, também usamos cookies fornecidos por
            terceiros confiáveis. A seção a seguir detalha quais cookies de
            terceiros você pode encontrar através deste site.
          </Text>
          <UnorderedList spacing={6}>
            <ListItem ml="6">
              Este site usa o Google Analytics, que é uma das soluções de
              análise mais difundidas e confiáveis ​​da Web, para nos ajudar a
              entender como você usa o site e como podemos melhorar sua
              experiência. Esses cookies podem rastrear itens como quanto tempo
              você gasta no site e as páginas visitadas, para que possamos
              continuar produzindo conteúdo atraente.
            </ListItem>
          </UnorderedList>
          <Text my="4">
            Para mais informações sobre cookies do Google Analytics, consulte a
            página oficial do Google Analytics.
          </Text>
          <UnorderedList spacing={2}>
            <ListItem ml="6">
              As análises de terceiros são usadas para rastrear e medir o uso
              deste site, para que possamos continuar produzindo conteúdo
              atrativo. Esses cookies podem rastrear itens como o tempo que você
              passa no site ou as páginas visitadas, o que nos ajuda a entender
              como podemos melhorar o site para você.
            </ListItem>
            <ListItem ml="6">
              Periodicamente, testamos novos recursos e fazemos alterações
              subtis na maneira como o site se apresenta. Quando ainda estamos
              testando novos recursos, esses cookies podem ser usados ​​para
              garantir que você receba uma experiência consistente enquanto
              estiver no site, enquanto entendemos quais otimizações os nossos
              usuários mais apreciam.
            </ListItem>
            <ListItem ml="6">
              À medida que vendemos produtos, é importante entendermos as
              estatísticas sobre quantos visitantes de nosso site realmente
              compram e, portanto, esse é o tipo de dados que esses cookies
              rastrearão. Isso é importante para você, pois significa que
              podemos fazer previsões de negócios com precisão que nos permitem
              analizar nossos custos de publicidade e produtos para garantir o
              melhor preço possível.
            </ListItem>
          </UnorderedList>
          <Heading my="4" as="h3" fontSize={'xl'}>
            Compromisso do Usuário
          </Heading>
          <Text mb="4">
            O usuário se compromete a fazer uso adequado dos conteúdos e da
            informação que o Hora do Devocional oferece no site e com caráter
            enunciativo, mas não limitativo:
          </Text>
          <UnorderedList spacing={1}>
            <ListItem ml="6">
              {'A)'} Não se envolver em atividades que sejam ilegais ou
              contrárias à boa fé a à ordem pública
            </ListItem>
            <ListItem ml="6">
              {'B)'} Não difundir propaganda ou conteúdo de natureza racista,
              xenofóbica, <Link href="https://jogoshoje.io">jogos de hoje</Link>{' '}
              ou azar, qualquer tipo de pornografia ilegal, de apologia ao
              terrorismo ou contra os direitos humanos;
            </ListItem>
            <ListItem ml="6">
              {'C)'} Não causar danos aos sistemas físicos (hardwares) e lógicos
              (softwares) do Hora do Devocional, de seus fornecedores ou
              terceiros, para introduzir ou disseminar vírus informáticos ou
              quaisquer outros sistemas de hardware ou software que sejam
              capazes de causar danos anteriormente mencionados.
            </ListItem>
          </UnorderedList>
          <Heading my="4" as="h3" fontSize={'xl'}>
            Mais informações
          </Heading>
          <Text>
            Esperemos que esteja esclarecido e, como mencionado anteriormente,
            se houver algo que você não tem certeza se precisa ou não,
            geralmente é mais seguro deixar os cookies ativados, caso interaja
            com um dos recursos que você usa em nosso site.
          </Text>
          <Text>
            Esta política é efetiva a partir de <strong>Janeiro</strong>/
            <strong>2022</strong>.
          </Text>
        </Box>
      </LayoutAuthenticating>
    </Page>
  )
}

export default PrivacyPolice
