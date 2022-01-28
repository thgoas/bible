import { gql } from '@apollo/client'

export const NEW_VERSE_OF_THE_DAY = gql`
  mutation newVerseOfTheDay(
    $book_id: Int
    $chapter: Int
    $first_verse: Int
    $end_verse: Int
    $publication: Boolean
    $user_id: Int
    $date_publication: Date
    $reflection: String
    $author: String
  ) {
    newVerseOfTheDay(
      data: {
        book_id: $book_id
        chapter: $chapter
        first_verse: $first_verse
        end_verse: $end_verse
        publication: $publication
        user_id: $user_id
        date_publication: $date_publication
        reflection: $reflection
        author: $author
      }
    ) {
      id
      reflection
      author
      book {
        id
        name
      }
      chapter
      first_verse
      end_verse
      user {
        id
        name
      }
      publication
      creation_date
      date_publication
    }
  }
`

export const VERSE_OF_THE_DAY_EDIT = gql`
  query verseOfTheDayEdit($id: Int) {
    verseOfTheDayEdit(filter: { id: $id }) {
      id
      reflection
      author
      book {
        id
        name
      }
      chapter
      first_verse
      end_verse
      user {
        id
        name
      }
      publication
      creation_date
      date_publication
    }
  }
`

export const EDIT_VERSE_OF_THE_DAY = gql`
  mutation editVerseOfTheDay(
    $id: Int
    $book_id: Int
    $chapter: Int
    $first_verse: Int
    $end_verse: Int
    $publication: Boolean
    $user_id: Int
    $date_publication: Date
    $reflection: String
    $author: String
  ) {
    editVerseOfTheDay(
      filter: { id: $id }
      data: {
        book_id: $book_id
        chapter: $chapter
        first_verse: $first_verse
        end_verse: $end_verse
        publication: $publication
        user_id: $user_id
        date_publication: $date_publication
        reflection: $reflection
        author: $author
      }
    ) {
      id
      reflection
      author
      book {
        id
        name
      }
      chapter
      first_verse
      end_verse
      user {
        id
        name
      }
      publication
      creation_date
      date_publication
    }
  }
`

export const DELETE_VERSE_OF_THE_DAY = gql`
  mutation deleteVerseOfTheDay($id: Int) {
    deleteVerseOfTheDay(filter: { id: $id }) {
      id
      reflection
      author
      book {
        id
        name
      }
      chapter
      first_verse
      end_verse
      user {
        id
        name
      }
      publication
      creation_date
      date_publication
    }
  }
`
