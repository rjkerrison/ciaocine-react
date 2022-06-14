import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getShowtimes } from '../../api/showtimes'
import Filters from '../filters/Filters'
import ViewSwitches from '../filters/ViewSwitches'
import MovieList from '../movies/MovieList'
import { formatAs } from '../../utils/formatDate'

const ShowtimeList = ({
  title = 'Séances',
  cinemaIdOrSlug,
  year,
  month,
  date,
}) => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewParams, setViewParams] = useState({ isTiles: false })
  const [movies, setMovies] = useState([])

  const [searchDate, setSearchDate] = useState(null)
  const yyyy = useMemo(() => searchDate?.getFullYear(), [searchDate])
  const mm = useMemo(() => searchDate?.getMonth(), [searchDate])
  const dd = useMemo(() => searchDate?.getDate(), [searchDate])

  useEffect(() => {
    if (year && month && date) {
      setSearchDate(new Date(year, month - 1, date))
    } else {
      setSearchDate(new Date())
    }
  }, [year, month, date])

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

  const incrementDate = (increment, searchDate) => {
    const newDate = new Date(searchDate - 0 + 86400 * 1000 * increment)

    const pathname = `/${
      cinemaIdOrSlug ? `cinemas/${cinemaIdOrSlug}` : 'showtimes'
    }/${formatAs.routeDate(newDate)}`

    navigate({
      pathname,
      search: searchParams.toString(),
    })

    setSearchDate(newDate)
  }

  return (
    <section className='movies-section'>
      <h1>
        {title} le {formatAs.weekdayDate(searchDate)}
      </h1>
      <p>
        Il y a {movies.length} films avec des séances le{' '}
        {formatAs.weekdayDate(searchDate)} qui satisfait vos filtres.
      </p>

      <Filters
        updateFilter={updateFilter}
        params={{ ...params, searchDate }}
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

export default ShowtimeList
