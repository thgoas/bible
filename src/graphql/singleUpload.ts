import { gql } from '@apollo/client'

export const SINGLE_UPLOAD = gql`
  mutation singleUpload($id: Int, $email: String, $file: Upload!) {
    singleUpload(filter: { id: $id, email: $email }, file: $file) {
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
