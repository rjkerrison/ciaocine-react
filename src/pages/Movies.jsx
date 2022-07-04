import { useContext, useEffect, useState } from 'react'
import { searchMovies } from '../api/movie'
import MovieCard from '../components/movies/MovieCard'
import SearchBar from '../components/movies/SearchBar'
import { LikedContext } from '../context/LikedContext'

const Movies = () => {
  const { likedMovies } = useContext(LikedContext)

  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const updateMovies = async () => {
      const movies = await searchMovies()
      setMovies(movies)
    }

    updateMovies()
  }, [])

  useEffect(() => {
    const filtered = movies.filter(
      ({ title, castingShort }) =>
        title.toLowerCase().includes(query.toLowerCase()) ||
        castingShort?.directors?.toLowerCase()?.includes(query.toLowerCase())
    )
    if (likedMovies) {
      const ids = likedMovies.map((a) => a.movie._id)
      filtered.sort((a, b) => ids.indexOf(b._id) - ids.indexOf(a._id))
    }

    setFilteredMovies(filtered)
  }, [query, movies, likedMovies])

  return (
    <section className='movies-section'>
      <h1>All our movies</h1>
      <SearchBar query={query} setQuery={setQuery} setMovies={setMovies} />
      <ul className='movie-list'>
        {filteredMovies.map((movie) => (
          <li className='movie' key={movie._id}>
            <MovieCard {...movie} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Movies
