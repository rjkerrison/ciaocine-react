import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getMetadata, makeMetadataRequest } from '../api/movie-relationship'
import { AuthContext } from './AuthContext'
import { ToastContext } from './ToastContext'

const MetadataContext = createContext()

const uniquelyCombine = (a, b, property) => {
  return [
    ...a[property],
    ...b[property].filter((c) => !a[property].includes(c)),
  ]
}

const toggleMarkAs = (
  key,
  { metadata, toast, removeFromMetadata, addToMetadata }
) => {
  return (slug, { title }) => {
    const toggle = async (isRemoval) => {
      const method = isRemoval ? 'delete' : 'post'
      await makeMetadataRequest({ slug, method, key })

      const changeMetadata = isRemoval ? removeFromMetadata : addToMetadata
      changeMetadata(slug, key)

      toast(
        <p>
          {isRemoval ? 'Removed' : 'Added'} <em>{title}</em>{' '}
          {isRemoval ? 'from' : 'to'} {key}
        </p>,
        () => toggle(!isRemoval)
      )
    }

    toggle(metadata[key].includes(slug))
  }
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

      if (newSlugs.length === 0) {
        return
      }

      const received = await getMetadata(newSlugs)
      setMetadata((current) => {
        return Object.fromEntries(
          ['movies', 'watches', 'dismisses', 'wants'].map((key) => [
            key,
            uniquelyCombine(current, received, key),
          ])
        )
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

  const markAs = useMemo(() => {
    const addToMetadata = (slug, key) => {
      setMetadata(({ [key]: value, ...metadata }) => {
        return {
          ...metadata,
          [key]: [...value, slug],
        }
      })
    }
    const removeFromMetadata = (slug, key) => {
      setMetadata(({ [key]: value, ...metadata }) => {
        return {
          ...metadata,
          [key]: value.filter((x) => x !== slug),
        }
      })
    }

    const config = {
      metadata,
      toast,
      addToMetadata,
      removeFromMetadata,
    }

    return {
      watched: toggleMarkAs('watches', config),
      dismissed: toggleMarkAs('dismisses', config),
      wanted: toggleMarkAs('wants', config),
    }
  }, [metadata, toast])

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
