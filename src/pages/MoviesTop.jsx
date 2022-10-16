import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getTopMovies } from '../api/movie'
import NavigationSearchBar from '../components/layout/NavigationSearchBar'
import MovieSearchResults from '../components/movies/MovieSearchResults'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import { MetadataContext } from '../context/MetadataContext'

import './Movies.scss'

const MoviesTop = () => {
  const [movies, setMovies] = useState([])
  const { updateMetadataForSlugs } = useContext(MetadataContext)

  useEffect(() => {
    updateMetadataForSlugs(movies.map(({ slug }) => slug))
  }, [movies, updateMetadataForSlugs])

  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()

  const query = searchParams.get('q')

  useEffect(() => {
    const updateMovies = async () => {
      setIsLoading(true)
      const movies = await getTopMovies(query)
      setMovies(movies)
      setIsLoading(false)
    }
    updateMovies()
  }, [query])

  return (
    <section className='movies-section'>
      <h1>Recently released movies</h1>
      <p>Looking for something in particular? Try searching:</p>
      <NavigationSearchBar />
      <MovieSearchResults
        movies={movies}
        query={query}
        // Override the sorting for this page
        sortFunction={(a, b) => 0}
      />
      {isLoading && <LoadingSpinner />}
    </section>
  )
}

export default MoviesTop
