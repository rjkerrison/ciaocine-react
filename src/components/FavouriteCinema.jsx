import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { API_URL } from '../utils/consts'

async function makeFavouriteCinemaCall(cinemaId, liked, token, setLiked) {
  const config = {
    method: liked ? 'delete' : 'post',
    baseURL: API_URL,
    url: `/likes/cinemas/${cinemaId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { liked: !liked },
  }
  try {
    await axios(config)
    setLiked(cinemaId, !liked)
  } catch (error) {
    console.error(error)
  }
}

const FavouriteCinema = ({ cinema, likedCinemas, setLiked }) => {
  const { isLoggedIn, isLoading, token } = useContext(AuthContext)
  const cinemaId = cinema._id
  const liked = likedCinemas?.some((x) => {
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
      onClick={() => makeFavouriteCinemaCall(cinemaId, liked, token, setLiked)}
    >
      {liked ? 'Starred!' : 'Star me'}
    </button>
  )
}

export default FavouriteCinema
