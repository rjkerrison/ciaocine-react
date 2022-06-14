import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getLikedCinemas } from '../api/likes'
import { AuthContext } from './AuthContext'

const LikedContext = createContext()

const LikedContextProvider = ({ children }) => {
  const [likedCinemas, setLikedCinemas] = useState([])
  const { isLoggedIn, isLoading } = useContext(AuthContext)

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

  const setLikedCinema = useCallback((cinemaId, liked) => {
    if (liked) {
      const newEntry = { cinema: { _id: cinemaId } }
      setLikedCinemas((lc) => [...lc, newEntry])
    } else {
      setLikedCinemas((lc) => lc.filter((x) => x.cinema._id !== cinemaId))
    }
  }, [])

  return (
    <LikedContext.Provider
      value={{
        likedCinemas,
        setLikedCinema,
      }}
    >
      {children}
    </LikedContext.Provider>
  )
}

export { LikedContextProvider, LikedContext }
