import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getShowtimes } from '../api/showtimes'
import Filters from '../components/filters/Filters'
import ViewSwitches from '../components/filters/ViewSwitches'
import MovieList from '../components/movies/MovieList'
import { formatAs } from '../utils/formatDate'

const Movies = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewParams, setViewParams] = useState({ isTiles: false })
  const [movies, setMovies] = useState([])
  const {
    cinemaIdOrSlug,
    year: routeYear,
    month: routeMonth,
    date: routeDate,
  } = useParams()

  const [date, setDate] = useState(null)
  const yyyy = useMemo(() => date?.getFullYear(), [date])
  const mm = useMemo(() => date?.getMonth(), [date])
  const dd = useMemo(() => date?.getDate(), [date])

  useEffect(() => {
    if (routeYear && routeMonth && routeDate) {
      setDate(new Date(routeYear, routeMonth - 1, routeDate))
    } else {
      setDate(new Date())
    }
  }, [routeYear, routeMonth, routeDate])

  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  )

  useEffect(() => {
    if (!yyyy || !params) {
      return
    }

    setIsLoading(true)

    let cancelled = false
    let source = axios.CancelToken.source()
    const getMovies = async () => {
      try {
        const { movies } = await getShowtimes({
          source,
          yyyy,
          mm,
          dd,
          cinema: cinemaIdOrSlug,
          ...params,
        })
        if (!cancelled) {
          setMovies(movies)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('error', error.message)
        if (!axios.isCancel(error)) {
          setIsLoading(false)
        }
      }
    }

    getMovies()

    return () => {
      cancelled = true
      source.cancel('Cancelling in cleanup')
    }
  }, [yyyy, mm, dd, params, cinemaIdOrSlug])

  const updateFilter = (name, value) => {
    if (name === 'daysAhead') {
      incrementDate(value, new Date())
      return
    }
    const newParams = { ...params }

    if (value === null) {
      delete newParams[name]
      setSearchParams(newParams)
    } else {
      newParams[name] = value
    }
    setSearchParams(newParams)
  }

  const incrementDate = (increment, date) => {
    const newDate = new Date(date - 0 + 86400 * 1000 * increment)

    const pathname = `/${
      cinemaIdOrSlug ? `cinemas/${cinemaIdOrSlug}` : 'showtimes'
    }/${formatAs.routeDate(newDate)}`

    navigate({
      pathname,
      search: searchParams.toString(),
    })

    setDate(newDate)
  }

  return (
    <section className='movies-section'>
      <h1>Showtimes on {formatAs.weekdayDate(date)}</h1>
      <p>
        {movies.length} films are showing on {formatAs.weekdayDate(date)}{' '}
        matching your filters{' '}
        {cinemaIdOrSlug &&
          movies?.[0]?.showtimes?.[0]?.cinema?.name &&
          `at ${movies?.[0]?.showtimes?.[0]?.cinema?.name}`}
      </p>

      <Filters
        updateFilter={updateFilter}
        params={{ ...params, date }}
        isCinema={!!cinemaIdOrSlug}
      >
        <ViewSwitches setViewParams={setViewParams} viewParams={viewParams} />
      </Filters>

      <MovieList
        isLoading={isLoading}
        movies={movies}
        className={viewParams.isTiles ? 'poster-tile-view' : ''}
      />
    </section>
  )
}

export default Movies
