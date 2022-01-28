import { gql } from '@apollo/client'

export const NEW_REFLECTION = gql`
  mutation newReflection(
    $text: String
    $author: String
    $user_id: Int
    $publication: Boolean
    $date_publication: Date
  ) {
    newReflection(
      data: {
        text: $text
        author: $author
        user_id: $user_id
        publication: $publication
        date_publication: $date_publication
      }
    ) {
      id
      text
      author
      user {
        id
        name
      }
      publication
      date_publication
    }
  }
`
export const REFLECTION = gql`
  query reflection($date_publication: Date, $publication: Boolean) {
    reflection(
      filter: { date_publication: $date_publication, publication: $publication }
    ) {
      id
      text
      author
      user {
        id
        name
      }
      publication
      date_publication
    }
  }
`
