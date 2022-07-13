import { useCallback, useEffect, useState } from 'react'
import MovieShowtimeSummary from './MovieShowtimeSummary'
import QuickFilter from './QuickFilter'
import LoadingSpinner from '../shared/LoadingSpinner'

const MovieList = ({ movies, isLoading, className }) => {
  const [currentQuery, setCurrentQuery] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  const updateFilteredMovies = useCallback(
    (q) => {
      const filtered = movies.filter(
        ({
          movie: { title, castingShort, originalTitle, externalIdentifiers },
        }) => {
          return [
            title,
            originalTitle,
            castingShort?.directors,
            castingShort?.actors,
            externalIdentifiers?.tmdb?.title,
            externalIdentifiers?.tmdb?.originalTitle,
          ]
            .filter((x) => x)
            .some((x) => x.toLowerCase().includes(q.toLowerCase()))
        }
      )

      setFilteredMovies(filtered)
    },
    [movies]
  )

  useEffect(() => {
    updateFilteredMovies(currentQuery)
  }, [updateFilteredMovies, currentQuery])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <QuickFilter setCurrentQuery={setCurrentQuery} />
      <div className={['movies', className].join(' ')}>
        {filteredMovies.map((props) => (
          <MovieShowtimeSummary key={props.movie._id} {...props} />
        ))}
      </div>
    </>
  )
}

export default MovieList
