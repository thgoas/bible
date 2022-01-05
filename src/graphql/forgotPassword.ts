import { gql } from '@apollo/client'

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String) {
    forgotPassword(filter: { email: $email }) {
      message
    }
  }
`
