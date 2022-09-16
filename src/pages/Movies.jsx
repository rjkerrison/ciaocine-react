import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../api/movie'
import NavigationSearchBar from '../components/layout/NavigationSearchBar'
import MovieSearchResults from '../components/movies/MovieSearchResults'
import LoadingSpinner from '../components/shared/LoadingSpinner'

import './Movies.scss'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()

  const query = searchParams.get('q')

  useEffect(() => {
    console.log('updating movies list', { query })
    const updateMovies = async () => {
      if (!query) {
        return
      }
      setIsLoading(true)
      const movies = await searchMovies(query)
      setMovies(movies)
      setIsLoading(false)
    }
    updateMovies()
  }, [query])

  return (
    <section className='movies-section'>
      <h1>Movies matching "{query}"</h1>
      <NavigationSearchBar />
      <MovieSearchResults movies={movies} query={query} />
      {isLoading && <LoadingSpinner />}
    </section>
  )
}

export default Movies
