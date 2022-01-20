import { useMutation, useLazyQuery } from '@apollo/client'

import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'
import { LOAD_SESSION, LOGIN } from '../graphql/auth'

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
  email: string
  url: string
  profiles: [ProfilesProps]
  shops: [ShopsProps]
  token: string
}
interface AuthContextProps {
  isAuthenticated?: boolean
  signIn: (data: SignInProps) => Promise<void>
  signOut: () => void
  resetLogin?: () => void
  loading?: boolean
  user?: UserProps
  loginLoading?: boolean
  errorLogin?: any
}

interface SignInProps {
  email: string
  password: string
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(true)

  const [
    login,
    {
      // data: loginData,
      loading: loginLoading,
      error: errorLogin,
      reset: resetLogin
    }
  ] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data) {
        // console.log('loginData', loginData)
        const { token } = data?.login
        // console.log(token)
        // console.log(loginData)
        setCookie(undefined, 'hora-do-devocional.token', token, {
          maxAge: 60 * 60 * 24 //1 hour
        })
        setUser(data?.login)
        Router.push('/')
      }
    }
  })

  const [loadSession] = useLazyQuery(LOAD_SESSION, {
    onCompleted: (data) => {
      authUser(data)
    },
    onError: (err) => {
      console.log(err)
      setLoading(false)
    }
  })

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
    } catch (err) {
      console.log(err)
    }
  }

  function signOut() {
    destroyCookie(undefined, 'hora-do-devocional.token')
    setUser(null)
    Router.push('/')
  }

  // useEffect(() => {
  //   if (errorLoadSession !== undefined) {
  //     setLoading(false)
  //   }
  // }, [errorLoadSession])

  // useEffect(() => {
  //   if (loginData) {
  //     // console.log('loginData', loginData)
  //     const { token } = loginData.login
  //     // console.log(token)
  //     // console.log(loginData)
  //     setCookie(undefined, 'hora-do-devocional.token', token, {
  //       maxAge: 60 * 60 * 24 //1 hour
  //     })
  //     setUser(loginData?.login)
  //     Router.push('/')
  //   }
  // }, [loginData])

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

        loginLoading,
        resetLogin,
        errorLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
