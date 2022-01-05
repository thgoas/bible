import { gql } from '@apollo/client'

export const RESET_PASSWORD = gql`
  mutation resetPassword($token: String, $password: String) {
    resetPassword(data: { token: $token, password: $password }) {
      name
      email
    }
  }
`
