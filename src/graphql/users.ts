import { gql } from '@apollo/client'

export const EDIT_USER = gql`
  mutation editUser(
    $id: Int!
    $email: String!
    $name: String
    $password: String
  ) {
    editUser(
      filter: { id: $id, email: $email }
      data: { name: $name, email: $email, password: $password }
    ) {
      id
      name
      email
      url
      profiles {
        id
        name
        description
      }
      token
    }
  }
`
export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($id: Int!, $email: String!) {
    deleteAccount(filter: { id: $id, email: $email }) {
      message
    }
  }
`
