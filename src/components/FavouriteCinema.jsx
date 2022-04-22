import { useContext, useMemo } from 'react'
import { likeCinema } from '../api/likes'
import { AuthContext } from '../context/AuthContext'
import { ToastContext } from '../context/ToastContext'

const FavouriteCinema = ({ cinema, likedCinemas, setLiked }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)
  const { toast } = useContext(ToastContext)

  const liked = useMemo(
    () =>
      likedCinemas &&
      Array.isArray(likedCinemas) &&
      likedCinemas?.some((x) => {
        if (!x.cinema) {
          return false
        }

        return x.cinema._id === cinema._id
      }),
    [cinema, likedCinemas]
  )

  if (isLoading || !isLoggedIn) {
    return <></>
  }

  return (
    <button
      className={'favourite-cinema' + (liked ? ' liked' : '')}
      onClick={() =>
        likeCinema(cinema._id, liked).then(({ liked: newLiked }) => {
          setLiked(cinema._id, newLiked)
          toast(
            `${cinema.name} ${
              newLiked ? 'added to' : 'removed from'
            } your favourites`
          )
        })
      }
    >
      {liked ? 'Starred!' : 'Star me'}
    </button>
  )
}

export default FavouriteCinema
