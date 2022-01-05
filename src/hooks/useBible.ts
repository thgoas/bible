import { useContext } from 'react'
import { BibleContext } from '../contexts/BibleContext'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useBible = () => useContext(BibleContext)

export default useBible
