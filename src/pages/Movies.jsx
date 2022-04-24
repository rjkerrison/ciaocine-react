import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Filters from '../components/filters/Filters'
import MovieList from '../components/movies/MovieList'
import { API_URL } from '../utils/consts'
import { formatAs } from '../utils/formatDate'

const getData = async ({ yyyy, mm, dd, ...criteria }) => {
  const {
    data: { movies },
  } = await axios({
    baseURL: API_URL,
    url: `/showtimes/${yyyy}/${mm + 1}/${dd}/`,
    params: criteria,
  })
  return { movies }
}

const Movies = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [date, setDate] = useState(new Date())
  const yyyy = useMemo(() => date.getFullYear(), [date])
  const mm = useMemo(() => date.getMonth(), [date])
  const dd = useMemo(() => date.getDate(), [date])
  const { cinemaId } = useParams()

  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  )

  useEffect(() => {
    if (!yyyy || !params) {
      return
    }

    setIsLoading(true)

    const getMovies = async () => {
      try {
        const { movies } = await getData({
          yyyy,
          mm,
          dd,
          cinema: cinemaId,
          ...params,
        })
        setMovies(movies)
      } catch (error) {
        console.error('error', error.message)
      }
      setIsLoading(false)
    }

    getMovies()
  }, [yyyy, mm, dd, params, cinemaId])

  const updateFilter = (name, value) => {
    if (name === 'daysAhead') {
      incrementDate(value, new Date())
    }

    setSearchParams({
      ...params,
      [name]: value,
    })
  }

  const incrementDate = (increment, date) => {
    const newDate = new Date(date - 0 + 86400 * 1000 * increment)
    setDate(newDate)
  }

  return (
    <section className='movies-section'>
      <h2>Showtimes</h2>
      <p>
        {movies.length} films are showing on {formatAs.weekdayDate(date)}{' '}
        matching your filters{' '}
        {cinemaId &&
          movies?.[0]?.showtimes?.[0]?.cinema?.name &&
          `at ${movies?.[0]?.showtimes?.[0]?.cinema?.name}`}
      </p>
      <nav>
        <Filters
          updateFilter={updateFilter}
          params={params}
          isCinema={!!cinemaId}
        />
      </nav>

      <MovieList isLoading={isLoading} movies={movies} />
    </section>
  )
}

export default Movies
