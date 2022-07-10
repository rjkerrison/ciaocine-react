import React, { useEffect, useState } from 'react'
import PopupLink from '../shared/PopupLink'
// import FavouriteMovie from '../FavouriteMovie'

import '../cinemas/CinemaCard.scss'
import MovieHeading from '../MovieHeading'
import MovieShowtimeSummary from './MovieShowtimeSummary'
import { getMovieData } from '../../api/movie'
import MovieShowtimes from '../MovieShowtimes'

const MovieCard = ({ slug, title, ...movie }) => {
  const [movieInfo, setMovieInfo] = useState(null)

  useEffect(() => {
    if (!movie._id) {
      return
    }
    const getMovie = async () => {
      const movieInfo = await getMovieData(movie._id)
      setMovieInfo(movieInfo)
    }
    getMovie()
  }, [movie._id])

  if (!movieInfo || !movieInfo.extra) {
    return <></>
  }

  const { showtimes, ...enhancedMovie } = {
    ...movieInfo,
    ...movie,
    showDate: true,
  }

  return (
    <>
      <MovieHeading {...enhancedMovie} title={title} slug={slug} />
      <MovieShowtimes showtimes={showtimes} movie={enhancedMovie} />
    </>
  )
}

export default MovieCard
