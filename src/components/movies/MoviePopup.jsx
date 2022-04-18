import axios from 'axios'
import React, { useEffect, useState } from 'react'
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

const MoviePopup = ({ movieId, active, close }) => {
  const [movieInfo, setMovieInfo] = useState(null)
  const [classes, setClasses] = useState(['movie-popup'])

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

  useEffect(() => {
    if (active) {
      const timeout = setTimeout(() => setClasses((c) => [...c, 'active']), 500)
      return () => clearTimeout(timeout)
    }
  }, [active])

  const deactivate = () => {
    setClasses((c) => c.filter((a) => a !== 'active'))
  }

  const handleTransitionEnd = () => {
    if (!classes.includes('active')) {
      close()
    }
  }

  if (!active || !movieInfo) {
    return <></>
  }

  return (
    <article
      className={classes.join(' ')}
      onClick={deactivate}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        onClick={(e) => e.stopPropagation()}
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
        <button className='round' onClick={deactivate}>
          X
        </button>
      </div>
    </article>
  )
}

export default MoviePopup
