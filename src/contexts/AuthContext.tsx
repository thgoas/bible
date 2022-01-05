import { useMutation, useLazyQuery } from '@apollo/client'

import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'
import { LOAD_SESSION, LOGIN } from '../graphql/auth'

// const LOGIN = gql`
//   mutation login($email: String!, $password: String!) {
//     login(data: { email: $email, password: $password }) {
//       id
//       name
//       email
//       profiles {
//         id
//         name
//         description
//       }
//       token
//     }
//   }
// `
// const LOAD_SESSION = gql`
//   query loadSession {
//     loadSession {
//       id
//       name
//       email
//       profiles {
//         id
//         name
//         description
//       }
//       token
//     }
//   }
// `
interface ProfilesProps {
  id: string
  name: string
  description: string
}
interface ShopsProps {
  id: string
  description: string
  cnpj: string
}
interface UserProps {
  id: string
  name: string
  profiles: [ProfilesProps]
  shops: [ShopsProps]
  token: string
}
interface AuthContextProps {
  isAuthenticated?: boolean
  signIn: (data: SignInProps) => Promise<void>
  signOut: () => void
  loginError?: any
  loading?: boolean
  user?: UserProps
  loginLoading?: boolean
}

interface SignInProps {
  email: string
  password: string
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginError, setLoginError] = useState(null)

  const [login, { data: loginData, loading: loginLoading }] = useMutation(LOGIN)
  const [loadSession, { error: errorLoadSession }] = useLazyQuery(
    LOAD_SESSION,
    {
      onCompleted: (data) => {
        authUser(data)
      }
    }
  )

  async function authUser(data: any) {
    const user = data.loadSession

    setUser(user)
    setLoading(false)
    // Router.push('/')
    // console.log('user', user)
  }

  async function signIn({ email, password }: SignInProps) {
    try {
      await login({
        variables: {
          email,
          password
        }
      })
    } catch (e) {
      setLoginError(e)
    }
  }

  function signOut() {
    destroyCookie(undefined, 'hora-do-devocional.token')
    setUser(null)
    Router.push('/')
  }

  useEffect(() => {
    if (errorLoadSession !== undefined) {
      setLoading(false)
    }
  }, [errorLoadSession])

  useEffect(() => {
    if (loginData) {
      // console.log('loginData', loginData)
      const { token } = loginData.login
      // console.log(token)
      // console.log(loginData)
      setCookie(undefined, 'hora-do-devocional.token', token, {
        maxAge: 60 * 60 * 24 //1 hour
      })
      setUser(loginData?.login)
      Router.push('/')
    }
  }, [loginData])

  useEffect(() => {
    const { 'hora-do-devocional.token': token } = parseCookies()
    if (token) {
      loadSession()
    } else {
      setLoading(false)
    }
  }, [loadSession])

  return (
    <AuthContext.Provider
      value={{
        // isAuthenticated,
        signIn,
        signOut,
        user,
        loading,
        loginError,
        loginLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
