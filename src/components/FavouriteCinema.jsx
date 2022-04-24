import { useContext } from 'react'
import { likeCinema } from '../api/likes'
import { AuthContext } from '../context/AuthContext'

const FavouriteCinema = ({ cinema, likedCinemas, setLiked }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)
  const cinemaId = cinema._id
  const liked =
    likedCinemas &&
    Array.isArray(likedCinemas) &&
    likedCinemas.some((x) => {
      if (!x.cinema) {
        return false
      }

      return x.cinema._id === cinemaId
    })

  if (isLoading || !isLoggedIn) {
    return <></>
  }

  return (
    <button
      className={'favourite-cinema' + (liked ? ' liked' : '')}
      onClick={() =>
        likeCinema(cinemaId, liked).then(({ liked: newLiked }) =>
          setLiked(cinemaId, newLiked)
        )
      }
    >
      {liked ? 'Starred!' : 'Star me'}
    </button>
  )
}

export default FavouriteCinema
