import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieData } from '../../api/movie'
import { formatAs } from '../../utils/formatDate'
import Actions from './Actions'
import Cast from './Cast'
import Crew from './Crew'

import './movie-popup-inner.scss'
import MovieActions from './MovieActions'
import MovieShowtimes from './MovieShowtimes'
import Poster from './Poster'

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

  const { showtimes, pastShowtimeCount, ...movie } = {
    ...movieInfo,
    showDate: true,
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`movie-popup-inner popup-inner ${
        movieInfo.images.backdrop && 'has-background'
      }`}
    >
      {movieInfo.images.backdrop && (
        <div
          className='background'
          style={{
            '--backdrop-path': `url(${movieInfo.images.backdrop})`,
          }}
        ></div>
      )}
      <aside>
        <Poster
          title={movieInfo.extra.original_title}
          posters={Object.values(movieInfo?.images)}
        />
        <Actions movie={movie}>
          <MovieActions {...movie} />
        </Actions>
      </aside>
      <header>
        <h1>{movieInfo.extra.original_title}</h1>{' '}
        <p>{formatAs.yearMonthDate(movieInfo.releaseDate)?.year}</p>{' '}
        <p>Directed by {movieInfo?.castingShort?.directors}</p>
      </header>
      <main>
        <p>{movieInfo.extra.overview}</p>
        {!!movieInfo.extra.vote_average && (
          <p>{movieInfo.extra.vote_average.toFixed(2)} / 10 on TMDB</p>
        )}
        <p>Released {formatAs.date(movieInfo.releaseDate)}</p>
        <p>Runtime: {movieInfo.extra.runtime} minutes</p>
        <section>
          <h2>Upcoming showtimes</h2>
          <MovieShowtimes movie={movie} showtimes={showtimes} />
        </section>
        <section>
          <Crew crew={movieInfo.extra.crew} />
          <Cast cast={movieInfo.extra.cast} />
        </section>
      </main>
    </div>
  )
}

export default MoviePopupInner
