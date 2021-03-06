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
    $creation_date: Date
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
        creation_date: $creation_date
      }
    ) {
      id
      verse_key
      personality_of_god
      promise
      conditions_promise
      personal_applications
      sins_to_avoid
      personal_notes
      user {
        id
        name
        email
      }
      book {
        id
        name
        abbreviation
      }
      chapter
      verses
      amount
      amount_day
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
      personal_notes
      user {
        id
        name
        email
      }
      book {
        id
        name
        abbreviation
      }
      chapter
      verses
      creation_date
      amount
      amount_day
    }
  }
`

export const DEVOTIONAL_MINIMUM = gql`
  query devotional($id: Int, $user_id: Int) {
    devotional(filter: { id: $id, user_id: $user_id }) {
      id
      user {
        id
      }
      book {
        id
        name
      }
      chapter
      verses
      creation_date
      amount
      amount_day
    }
  }
`
export const DELETE_DEVOTIONAL = gql`
  mutation deleteDevotional($id: Int, $user_id: Int) {
    deleteDevotional(filter: { id: $id, user_id: $user_id }) {
      id
      user {
        id
      }
      book {
        id
        name
      }
      chapter
      verses
      creation_date
      amount
      amount_day
    }
  }
`
