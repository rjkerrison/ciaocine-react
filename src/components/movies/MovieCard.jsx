import React from 'react'
import PopupLink from '../shared/PopupLink'
// import FavouriteMovie from '../FavouriteMovie'

import '../cinemas/CinemaCard.scss'
import MovieHeading from '../MovieHeading'

const MovieCard = ({ slug, title, ...movie }) => {
  return (
    <>
      <h2>
        <PopupLink to={`/movies/${slug}`}>{title}</PopupLink>
      </h2>
      <MovieHeading {...movie} title={title} slug={slug} />
    </>
  )
}

export default MovieCard
