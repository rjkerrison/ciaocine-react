import { useCallback, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../api/movie'
import MovieCard from '../components/movies/MovieCard'
import { LikedContext } from '../context/LikedContext'

const Movies = () => {
  const { likedMovies } = useContext(LikedContext)

  const [movies, setMovies] = useState([])

  const [searchParams] = useSearchParams()

  const query = searchParams.get('q')

  const updateMovies = useCallback(async () => {
    if (!query) {
      return
    }
    const movies = await searchMovies(query)
    setMovies(movies)
  }, [query])

  useEffect(() => {
    updateMovies()
  }, [updateMovies])

  return (
    <section className='movies-section'>
      <h1>Movies matching your search</h1>
      <ul className='movie-list'>
        {movies.map((movie) => (
          <li className='movie' key={movie._id}>
            <MovieCard {...movie} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Movies
