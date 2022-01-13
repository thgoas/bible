import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
// import Router from 'next/router'
import { parseCookies } from 'nookies'

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI
})

let token = ''
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const accessToken = (ctx) => {
  const { 'hora-do-devocional.token': isToken } = parseCookies(ctx)
  token = isToken
}

const authLink = setContext((_, { headers }) => {
  const { 'hora-do-devocional.token': isToken } = parseCookies()
  if (isToken) {
    token = isToken
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
