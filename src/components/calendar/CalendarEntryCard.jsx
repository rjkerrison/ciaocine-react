import { useEffect, useMemo, useState } from 'react'
import { getMovieData } from '../../api/movie'
import { formatAs } from '../../utils/formatDate'
import CalendarMovieSummary from './CalendarMovieSummary'

const CalendarEntryCard = ({ ...showtime }) => {
  const [movieInfo, setMovieInfo] = useState({ extra: { runtime: 120 } })
  const length = useMemo(
    () => Math.floor(movieInfo.extra.runtime / 15),
    [movieInfo.extra.runtime]
  )
  const index = useMemo(
    // adjust to start day at 8am
    () => formatAs.fifteenMinuteIndex(showtime.startTime) - 32,
    [showtime.startTime]
  )

  useEffect(() => {
    if (!showtime.movie._id) {
      return
    }
    const getMovie = async () => {
      const movieInfo = await getMovieData(showtime.movie._id)
      setMovieInfo(movieInfo)
    }
    getMovie()
  }, [showtime.movie._id])

  return (
    <>
      <div
        style={{
          gridRowStart: index,
          gridRowEnd: `span ${length}`,
          padding: '0.25rem',
        }}
      >
        <CalendarMovieSummary {...showtime} runtime={movieInfo.extra.runtime} />
      </div>
    </>
  )
}

export default CalendarEntryCard
