import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../utils/consts'
import { formatAs } from '../../utils/formatDate'

const getData = async (movieId) => {
  const {
    data: { movie, tmdbInfo },
  } = await axios({
    baseURL: API_URL,
    url: `/movies/${movieId}/`,
  })
  return { ...movie, extra: tmdbInfo[0] }
}

const MoviePopupInner = () => {
  const { movieId } = useParams()
  const [movieInfo, setMovieInfo] = useState(null)

  useEffect(() => {
    if (!movieId) {
      return
    }
    const getMovie = async () => {
      const movieInfo = await getData(movieId)
      setMovieInfo(movieInfo)
    }
    getMovie()
  }, [movieId])

  if (!movieInfo) {
    return <></>
  }

  return (
    <div
      style={{
        '--backdrop-path': `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieInfo.extra.backdrop_path})`,
      }}
    >
      <h2>{movieInfo.extra.original_title}</h2>
      <p>{movieInfo.extra.overview}</p>
      <p>{movieInfo.extra.vote_average} / 10 on TMDB</p>
      <p>Released {formatAs.date(movieInfo.extra.release_date)}</p>
      <ul>
        {movieInfo.extra.crew.slice(0, 5).map(({ job, name, id }) => (
          <li key={id + job}>
            {job}: {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoviePopupInner
