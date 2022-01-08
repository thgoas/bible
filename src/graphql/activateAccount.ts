import { gql } from '@apollo/client'

export const ACTIVATE_ACCOUNT = gql`
  mutation activateAccount($token: String, $active: Boolean) {
    activateAccount(data: { token: $token, active: $active }) {
      name
      email
    }
  }
`
