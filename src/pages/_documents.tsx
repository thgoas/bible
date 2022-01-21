import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import theme from './../styles/theme'

export default class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    return (
      <Html lang="pt-Br">
        <Head>
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          /> */}
          {/* <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            crossOrigin="anonymous"
          ></script> */}
          <link rel="hora do devocional icon" href="/public/favicon.ico" />
        </Head>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
