import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieData } from '../../api/movie'
import { formatAs } from '../../utils/formatDate'
import Cast from './Cast'
import Crew from './Crew'

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

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='movie-popup-inner popup-inner'
    >
      <div
        className='background'
        style={{
          '--backdrop-path': `url(${movieInfo.images.backdrop})`,
        }}
      ></div>
      <header>
        <h1>{movieInfo.extra.original_title}</h1>
        <p>{formatAs.yearMonthDate(movieInfo.releaseDate)?.year}</p>
        <p>Directed by {movieInfo?.castingShort?.directors}</p>
      </header>
      <main>
        <p>{movieInfo.extra.overview}</p>
        {movieInfo.extra.vote_average && (
          <p>{movieInfo.extra.vote_average.toFixed(2)} / 10 on TMDB</p>
        )}
        <p>Released {formatAs.date(movieInfo.releaseDate)}</p>
        <p>Runtime: {movieInfo.extra.runtime} minutes</p>
        <Crew crew={movieInfo.extra.crew} />
        <Cast cast={movieInfo.extra.cast} />
      </main>
    </div>
  )
}

export default MoviePopupInner
