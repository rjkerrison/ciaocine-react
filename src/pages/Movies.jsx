import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieHeading from '../components/MovieHeading'
import MovieShowtimes from '../components/MovieShowtimes'
import { API_URL } from '../utils/consts'
import { formatAs } from '../utils/formatDate'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    if (!date) {
      return
    }

    const getMovies = async () => {
      const {
        data: { movies },
      } = await axios({
        baseURL: API_URL,
        url: `/showtimes/${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}/`,
      })
      setMovies(movies)
    }

    getMovies()
  }, [date])

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
        {/* {{> moviesFilters label='sur le' urls=calendarUrls}}
  {{> moviesFilters label='à partir de' urls=hoursUrls}}
  {{> moviesFilters label='+ de filtres' urls=filtersUrls}} */}
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
