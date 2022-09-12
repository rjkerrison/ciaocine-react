import { useMemo } from 'react'

import './MovieSearchResults.scss'

import MovieCard from './MovieCard'

const MovieSearchResults = ({ movies, query }) => {
  const sortedMovies = useMemo(
    () => [...movies].sort((a, b) => b.showtimes.length - a.showtimes.length),
    [movies]
  )

  if (!movies || movies.length === 0) {
    return <p>No movies found for "{query}"</p>
  }

  return (
    <ul className='movie-search-results'>
      {sortedMovies.map((movie) => (
        <li key={movie._id}>
          <MovieCard {...movie} />
        </li>
      ))}
    </ul>
  )
}

export default MovieSearchResults
