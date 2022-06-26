import { useCallback, useEffect, useState } from 'react'
import MovieShowtimeSummary from './MovieShowtimeSummary'
import QuickFilter from './QuickFilter'

const MovieList = ({ movies, isLoading, className }) => {
  const [currentQuery, setCurrentQuery] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  const updateFilteredMovies = useCallback(
    (q) => {
      const filtered = movies.filter(({ movie: { title } }) =>
        title.toLowerCase().includes(q.toLowerCase())
      )

      setFilteredMovies(filtered)
    },
    [movies]
  )

  useEffect(() => {
    updateFilteredMovies(currentQuery)
  }, [updateFilteredMovies, currentQuery])

  if (isLoading) {
    return <div className='centre loading'></div>
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
