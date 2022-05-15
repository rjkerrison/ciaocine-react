import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import service from '../api/service'
import Filters from '../components/filters/Filters'
import ViewSwitches from '../components/filters/ViewSwitches'
import MovieList from '../components/movies/MovieList'
import { formatAs } from '../utils/formatDate'

const getData = async ({ source, yyyy, mm, dd, ...criteria }) => {
  const {
    data: { movies },
  } = await service.request({
    cancelToken: source.token,
    url: `/showtimes/${yyyy}/${mm + 1}/${dd}/`,
    params: criteria,
  })
  return { movies }
}

const Movies = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewParams, setViewParams] = useState({ isTiles: false })
  const [movies, setMovies] = useState([])
  const {
    cinemaId,
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
        const { movies } = await getData({
          source,
          yyyy,
          mm,
          dd,
          cinema: cinemaId,
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
  }, [yyyy, mm, dd, params, cinemaId])

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
      cinemaId ? `cinemas/${cinemaId}` : 'movies'
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
        {cinemaId &&
          movies?.[0]?.showtimes?.[0]?.cinema?.name &&
          `at ${movies?.[0]?.showtimes?.[0]?.cinema?.name}`}
      </p>

      <Filters
        updateFilter={updateFilter}
        params={{ ...params, date }}
        isCinema={!!cinemaId}
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
