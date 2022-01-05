import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
// import Router from 'next/router'
import { parseCookies } from 'nookies'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
  //uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI
})

let token = ''
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const accessToken = (ctx) => {
  const { 'hora-do-devocional.token': isToken } = parseCookies(ctx)
  token = isToken
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token')

  const { 'hora-do-devocional.token': isToken } = parseCookies()
  if (isToken) {
    token = isToken
  }
  // return the headers to the context so httpLink can read them
  // console.log('apoloclient token', token)
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
