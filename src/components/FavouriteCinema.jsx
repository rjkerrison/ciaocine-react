import { useContext, useMemo } from 'react'
import { likeCinema } from '../api/likes'
import { ToastContext } from '../context/ToastContext'
import { LikedContext } from '../context/LikedContext'
import Authenticated from './shared/Authenticated'
import Button from './shared/Button'

const FavouriteCinema = ({ cinema }) => {
  const { toast } = useContext(ToastContext)
  const { likedCinemas, setLikedCinema } = useContext(LikedContext)

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

  return (
    <Button
      classes={['favourite-cinema', liked ? ' liked' : '']}
      onClick={() =>
        likeCinema(cinema._id, liked).then(({ liked: newLiked }) => {
          setLikedCinema(cinema._id, newLiked)
          toast(
            `${cinema.name} ${
              newLiked ? 'added to' : 'removed from'
            } your favourites`
          )
        })
      }
    >
      {liked ? '⭐️' : '☆'}
    </Button>
  )
}

export default Authenticated(FavouriteCinema)
