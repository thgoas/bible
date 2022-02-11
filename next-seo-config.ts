const title = 'horadodevocional.com.br - Seu devocional diário.'
const description = 'Faça seu devocional e guarde tudo Online.'

export const SEO = {
  title,
  description,
  canonical: 'https://horadodevocional.com.br',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://horadodevocional.com.br',
    title,
    description,
    images: [
      {
        url: 'https://horadodevocional.com.br/logo.png',
        alt: title,
        with: 1280,
        height: 720
      }
    ]
  }
}
