import { gql } from '@apollo/client'

export const DASHBOARD = gql`
  query dashboard {
    dashboard {
      devotionalCount
      usersCountActive
      usersCountDeleteAccount
      usersCountTotal
      verseOfDayCount
    }
  }
`

export const VERSES_OF_THE_DAYS = gql`
  query versesOfTheDays {
    versesOfTheDays {
      id
      chapter
      first_verse
      end_verse
      book {
        id
        name
      }
      date_publication
    }
  }
`
