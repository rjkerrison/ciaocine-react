import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getMetadata } from '../api/movie-relationship'
import { AuthContext } from './AuthContext'

const MetadataContext = createContext()

const uniquelyCombine = (a, b, property) => {
  return [
    ...a[property],
    ...b[property].filter((c) => !a[property].includes(c)),
  ]
}

const MetadataContextProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({
    movies: [],
    watches: [],
    dismisses: [],
    wants: [],
  })

  const { isLoggedIn, isLoading } = useContext(AuthContext)

  const updateMetadataForSlugs = useCallback(
    async (slugs) => {
      const newSlugs = slugs.filter(
        (slug) => slug && !metadata.movies.includes(slug)
      )
      console.log({ slugs, newSlugs })

      if (newSlugs.length === 0) {
        return
      }

      const received = await getMetadata(newSlugs)
      setMetadata((current) => {
        return {
          movies: uniquelyCombine(current, received, 'movies'),
          watches: uniquelyCombine(current, received, 'watches'),
          dismisses: uniquelyCombine(current, received, 'dismisses'),
          wants: uniquelyCombine(current, received, 'wants'),
        }
      })
    },
    [metadata.movies]
  )

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!isLoggedIn) {
      setMetadata({
        movies: [],
        watches: [],
        dismisses: [],
        wants: [],
      })
    }
  }, [isLoading, isLoggedIn])

  return (
    <MetadataContext.Provider
      value={{
        metadata,
        updateMetadataForSlugs,
      }}
    >
      {children}
    </MetadataContext.Provider>
  )
}

export { MetadataContextProvider, MetadataContext }
