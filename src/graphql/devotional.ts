import { gql } from '@apollo/client'

export const NEW_DEVOTIONAL = gql`
  mutation newDevotional(
    $verse_key: String
    $personality_of_god: String
    $promise: String
    $conditions_promise: String
    $personal_applications: String
    $sins_to_avoid: String
    $personal_notes: String
    $user_id: Int
    $book_id: Int
    $chapter: Int
    $verses: String
  ) {
    newDevotional(
      data: {
        verse_key: $verse_key
        personality_of_god: $personality_of_god
        promise: $promise
        conditions_promise: $conditions_promise
        personal_applications: $personal_applications
        sins_to_avoid: $sins_to_avoid
        personal_notes: $personal_notes
        user_id: $user_id
        book_id: $book_id
        chapter: $chapter
        verses: $verses
      }
    ) {
      id
      verse_key
      personality_of_god
      promise
      conditions_promise
      personal_applications
      sins_to_avoid
      user {
        id
        name
        email
      }
      book {
        id
        name
      }
      chapter
      verses
    }
  }
`

export const DEVOTIONAL = gql`
  query devotional($id: Int, $user_id: Int) {
    devotional(filter: { id: $id, user_id: $user_id }) {
      id
      verse_key
      personality_of_god
      promise
      conditions_promise
      personal_applications
      sins_to_avoid
      user {
        id
        name
        email
      }
      book {
        id
        name
      }
      chapter
      verses
      creation_date
    }
  }
`
