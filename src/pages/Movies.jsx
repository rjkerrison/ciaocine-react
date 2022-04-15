import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterGroup from '../components/FilterGroup'
import MovieHeading from '../components/MovieHeading'
import MovieShowtimes from '../components/MovieShowtimes'
import { API_URL } from '../utils/consts'
import { formatAs } from '../utils/formatDate'

const getData = async ({ date, ...criteria }) => {
  const {
    data: { movies },
  } = await axios({
    baseURL: API_URL,
    url: `/showtimes/${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}/`,
    params: criteria,
  })
  return { movies }
}

const Movies = () => {
  const filters = [
    { name: 'ugcIllimite', type: 'toggle', label: 'UGC Illimité' },
    { name: 'rive', type: 'switch', options: ['droite', 'gauche'] },
  ]

  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [date, setDate] = useState(new Date())
  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  )

  useEffect(() => {
    if (!date || !params) {
      return
    }

    console.log({ date, params }, 'LOADING======')

    const getMovies = async () => {
      const { movies } = await getData({ date, ...params })
      setMovies(movies)
      console.log({ date, params }, 'DONE')
    }

    getMovies()
  }, [date, params])

  const updateFilter = (name, value) => {
    setSearchParams({
      ...params,
      [name]: value,
    })
  }

  const incrementDate = (increment) => {
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
        <button onClick={() => incrementDate(1)}>Next date</button>
        {filters.map((filter) => (
          <FilterGroup
            {...filter}
            updateFilter={updateFilter}
            values={params}
          />
        ))}
      </nav>
      <div className='movies'>
        {movies.map(({ movie, showtimes }) => (
          <div
            key={movie._id}
            className='movie overlay-container expander-container'
          >
            <MovieHeading {...movie} />
            <MovieShowtimes showtimes={showtimes} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Movies
