import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getMetadata } from '../api/movie-relationship'
import { AuthContext } from './AuthContext'

import { postDismiss, postWant, postWatch } from '../api/movie-relationship'
import { ToastContext } from './ToastContext'

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
  const { toast } = useContext(ToastContext)

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

  const addToMetadata = (slug, key) => {
    setMetadata(({ [key]: value, ...metadata }) => {
      return {
        ...metadata,
        [key]: [...value, slug],
      }
    })
  }

  const markAsWatched = (slug, { title }) => {
    if (!metadata.watches.includes(slug)) {
      postWatch(slug).then(() => {
        addToMetadata(slug, 'watches')
        toast(`Marked ${title} as watched`)
      })
    }
  }

  const markAsDismissed = (slug, { title }) => {
    postDismiss(slug).then(() => {
      addToMetadata(slug, 'dismissed')
      toast(`Marked ${title} as dismissed`)
    })
  }

  const markAsWanted = (slug, { title }) => {
    postWant(slug, 10).then(() => {
      addToMetadata(slug, 'wants')
      toast(`Marked ${title} as wanted`)
    })
  }

  const markAs = {
    watched: markAsWatched,
    dismissed: markAsDismissed,
    wanted: markAsWanted,
  }

  return (
    <MetadataContext.Provider
      value={{
        metadata,
        markAs,
        updateMetadataForSlugs,
      }}
    >
      {children}
    </MetadataContext.Provider>
  )
}

export { MetadataContextProvider, MetadataContext }
