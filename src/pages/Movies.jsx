import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Filters from '../components/filters/Filters'
import MovieShowtimeSummary from '../components/movies/MovieShowtimeSummary'
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
        const { movies } = await getData({ yyyy, mm, dd, ...params })
        setMovies(movies)
      } catch (error) {
        console.error('error', error.message)
      }
      setIsLoading(false)
    }

    getMovies()
  }, [yyyy, mm, dd, params])

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
      <h2>{formatAs.weekdayDate(date)}</h2>
      <p>
        {movies.length} films are showing on {formatAs.weekdayDate(date)}{' '}
        matching your filters
      </p>
      <nav>
        <Filters updateFilter={updateFilter} params={params} />
      </nav>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className='movies'>
          {movies.map((props) => (
            <MovieShowtimeSummary key={props.movie._id} {...props} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Movies
