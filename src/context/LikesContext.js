import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getLikedCinemas } from '../api/likes'
import { AuthContext } from './AuthContext'

const LikesContext = createContext()

const LikesContextProvider = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)
  const [likedCinemas, setLikedCinemas] = useState([])

  const updateLikedCinemas = async () => {
    const likedCinemas = await getLikedCinemas()
    setLikedCinemas(likedCinemas)
  }

  useEffect(() => {
    if (isLoading || !isLoggedIn) {
      return
    }

    updateLikedCinemas()
  }, [isLoading, isLoggedIn])

  const changeLikeCinema = useCallback((cinemaId, liked) => {
    if (liked) {
      const newEntry = { cinema: { _id: cinemaId } }
      setLikedCinemas((lc) => [...lc, newEntry])
    } else {
      setLikedCinemas((lc) => lc.filter((x) => x.cinema._id !== cinemaId))
    }
  }, [])

  return (
    <LikesContext.Provider
      value={{
        changeLikeCinema,
        updateLikedCinemas,
        likedCinemas,
      }}
    >
      {children}
    </LikesContext.Provider>
  )
}

export { LikesContextProvider, LikesContext }
