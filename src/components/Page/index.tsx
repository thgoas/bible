import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

interface PageProps {
  title: string
  description: string
}

const Page: NextPage<PageProps> = ({ title, description, children }) => {
  const route = useRouter()
  const url = `https://horadodevocional${route.pathname}`

  return (
    <div>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      {children}
    </div>
  )
}

export default Page
