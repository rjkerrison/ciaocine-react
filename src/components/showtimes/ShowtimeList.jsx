import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getShowtimes } from '../../api/showtimes'
import Filters from '../filters/Filters'
import MovieList from '../movies/MovieList'
import { formatAs } from '../../utils/formatDate'
import { useContext } from 'react'
import { MetadataContext } from '../../context/MetadataContext'
import ShowtimeResultsSummary from './ShowtimeResultsSummary'

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
  const [movies, setMovies] = useState([])

  const { updateMetadataForSlugs } = useContext(MetadataContext)

  useEffect(() => {
    updateMetadataForSlugs(movies.map(({ movie: { slug } }) => slug))
  }, [movies, updateMetadataForSlugs])

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

    let cancelled = false
    const source = axios.CancelToken.source()
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

    setIsLoading(true)
    getMovies()

    return () => {
      cancelled = true
      source.cancel('Cancelling in cleanup')
    }
  }, [yyyy, mm, dd, params, cinemaIdOrSlug])

  const incrementDate = useCallback(
    (increment, searchDate) => {
      const newDate = new Date(searchDate - 0 + 86400 * 1000 * increment)

      const pathname = `/${
        cinemaIdOrSlug ? `cinemas/${cinemaIdOrSlug}` : 'showtimes'
      }/${formatAs.routeDate(newDate)}`

      navigate({
        pathname,
        search: searchParams.toString(),
      })

      setSearchDate(newDate)
    },
    [cinemaIdOrSlug, navigate, searchParams]
  )

  const updateFilter = useCallback(
    (name, value) => {
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
        setSearchParams(newParams)
      }
    },
    [incrementDate, params, setSearchParams]
  )

  useEffect(() => {
    document.title = `Ciaocine | ${title} le ${formatAs.weekdayDate(
      searchDate
    )}`
  }, [title, searchDate])

  return (
    <section className='movies-section'>
      <h1>
        {title} le {formatAs.weekdayDate(searchDate)}
      </h1>
      <ShowtimeResultsSummary movies={movies} searchDate={searchDate} />

      <Filters
        updateFilter={updateFilter}
        params={{ ...params, searchDate }}
        isCinema={!!cinemaIdOrSlug}
      />

      <MovieList isLoading={isLoading} movies={movies} />
    </section>
  )
}

export default ShowtimeList
