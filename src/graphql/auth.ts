import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      name
      email
      profiles {
        id
        name
        description
      }
      token
    }
  }
`
export const LOAD_SESSION = gql`
  query loadSession {
    loadSession {
      id
      name
      email
      profiles {
        id
        name
        description
      }
      token
    }
  }
`
