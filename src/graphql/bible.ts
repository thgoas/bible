import { gql } from '@apollo/client'

export const VERSE = gql`
  query verse($version_id: Int, $book_id: Int, $chapter: Int) {
    verse(
      filter: { version_id: $version_id, book_id: $book_id, chapter: $chapter }
    ) {
      id
      text
      chapter
      verse
      version {
        name
      }
      book {
        name
      }
    }
  }
`

export const CHAPTER_COUNT = gql`
  query chapterCount($version_id: Int, $book_id: Int) {
    chapterCount(filter: { version_id: $version_id, book_id: $book_id }) {
      chapter
    }
  }
`

export const VERSIONS = gql`
  query versions {
    versions {
      id
      name
    }
  }
`

export const TESTAMENTS = gql`
  query testaments {
    testaments {
      id
      name
    }
  }
`

export const BOOK = gql`
  query book($testament_id: Int) {
    book(filter: { testament_id: $testament_id }) {
      id
      name
      position
      abbreviation
    }
  }
`
