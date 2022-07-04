import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieData } from '../../api/movie'
import { formatAs } from '../../utils/formatDate'
import Cast from './Cast'
import Crew from './Crew'
import MovieShowtimeSummary from './MovieShowtimeSummary'

import './movie-popup-inner.scss'

const MoviePopupInner = () => {
  const { movieId } = useParams()
  const [movieInfo, setMovieInfo] = useState(null)

  useEffect(() => {
    if (!movieId) {
      return
    }
    const getMovie = async () => {
      const movieInfo = await getMovieData(movieId)
      setMovieInfo(movieInfo)
    }
    getMovie()
  }, [movieId])

  if (!movieInfo || !movieInfo.extra) {
    return <></>
  }

  console.log({ movieInfo })

  const { showtimes, ...movie } = { ...movieInfo, showDate: true }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        '--backdrop-path': `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieInfo.extra.backdrop_path})`,
      }}
      className='movie-popup-inner popup-inner'
    >
      <MovieShowtimeSummary
        key={movie._id}
        movie={movie}
        showtimes={showtimes}
      />
      <h2>{movieInfo.extra.original_title}</h2>
      <p>{movieInfo.extra.overview}</p>
      <p>{movieInfo.extra.vote_average} / 10 on TMDB</p>
      <p>Released {formatAs.date(movieInfo.extra.release_date)}</p>
      <p>Runtime: {movieInfo.extra.runtime} minutes</p>
      <Crew crew={movieInfo.extra.crew} />
      <Cast cast={movieInfo.extra.cast} />
    </div>
  )
}

export default MoviePopupInner
