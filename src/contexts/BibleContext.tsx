import { useLazyQuery } from '@apollo/client'
import { createContext } from 'react'
import {
  BOOK,
  CHAPTER_COUNT,
  TESTAMENTS,
  VERSE,
  VERSIONS
} from '../graphql/bible'

interface BibleContextProps {
  handleVerses: (variables: VerseVar) => Promise<void>
  loadingVerse: boolean
  dataVerse: VerseData
  handleChapterCounts: (variables: ChapterCountVar) => Promise<void>
  dataChapterCount: ChapterCountData
  loadingChapterCount: boolean
  handleVersions: () => Promise<void>
  dataVersions: VersionsData
  loadingVersions: boolean
  handleTestaments: () => Promise<void>
  dataTestaments: TestamentsData
  loadingTestaments: boolean
  handleBook: (variables: BookVar) => Promise<void>
  dataBook: BookData
  loadingBook: boolean
}
interface VerseData {
  verse: Verse[]
}
interface VerseVar {
  version_id: number
  book_id: number
  chapter: number
}
interface Verse {
  id: number
  text: string
  chapter: number
  verse: number
  version: {
    name: string
  }
  book: {
    name: string
  }
}
interface ChapterCountData {
  chapterCount: ChapterCount[]
}
interface ChapterCount {
  chapter: number
}

interface ChapterCountVar {
  version_id: number
  book_id: number
}

interface Versions {
  id: number
  name: string
}
interface VersionsData {
  versions: Versions[]
}

interface Testaments {
  id: number
  name: string
}

interface TestamentsData {
  testaments: Testaments[]
}

interface Book {
  id: number
  name: string
  position: number
  abbreviation: string
}

interface BookData {
  book: Book[]
}

interface BookVar {
  testament_id: number
}

export const BibleContext = createContext({} as BibleContextProps)

export const BibleProvider: React.FC = ({ children }) => {
  const [verse, { data: dataVerse, loading: loadingVerse }] = useLazyQuery<
    VerseData,
    VerseVar
  >(VERSE)
  const [
    chapterCount,
    { data: dataChapterCount, loading: loadingChapterCount }
  ] = useLazyQuery<ChapterCountData, ChapterCountVar>(CHAPTER_COUNT)
  const [versions, { data: dataVersions, loading: loadingVersions }] =
    useLazyQuery<VersionsData>(VERSIONS)
  const [testaments, { data: dataTestaments, loading: loadingTestaments }] =
    useLazyQuery<TestamentsData>(TESTAMENTS)
  const [book, { data: dataBook, loading: loadingBook }] = useLazyQuery<
    BookData,
    BookVar
  >(BOOK)

  const handleVerses = async (variables: VerseVar) => {
    await verse({
      variables: { ...variables }
    })
  }

  const handleChapterCounts = async (variables: ChapterCountVar) => {
    await chapterCount({
      variables: { ...variables }
    })
  }

  const handleVersions = async () => {
    await versions()
  }
  const handleTestaments = async () => {
    await testaments()
  }

  const handleBook = async (variables: BookVar) => {
    await book({ variables: { ...variables } })
  }

  return (
    <BibleContext.Provider
      value={{
        handleVerses,
        loadingVerse,
        dataVerse,
        handleChapterCounts,
        dataChapterCount,
        loadingChapterCount,
        handleVersions,
        dataVersions,
        loadingVersions,
        handleTestaments,
        dataTestaments,
        loadingTestaments,
        handleBook,
        dataBook,
        loadingBook
      }}
    >
      {children}
    </BibleContext.Provider>
  )
}
