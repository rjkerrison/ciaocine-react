import { useCallback, useEffect, useState } from 'react'
import MovieShowtimeSummary from './MovieShowtimeSummary'

const MovieList = ({ movies, isLoading, className }) => {
  const [query, setQuery] = useState('')
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setCurrentQuery(query)
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  if (isLoading) {
    return <div className='centre loading'></div>
  }

  return (
    <div className={['movies', className].join(' ')}>
      <form onSubmit={handleSubmit}>
        <h3>Quick filter</h3>
        <label htmlFor='name'>By name</label>{' '}
        <input
          type='text'
          id='name'
          name='name'
          value={query}
          placeholder="e.g. 'Batman'"
          onChange={handleQueryChange}
        />
        <input type='submit' value='Run' />
      </form>
      {filteredMovies.map((props) => (
        <MovieShowtimeSummary key={props.movie._id} {...props} />
      ))}
    </div>
  )
}

export default MovieList
