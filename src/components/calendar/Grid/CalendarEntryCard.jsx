import { useEffect, useMemo } from 'react'
import { formatAs } from '../../../utils/formatDate'
import GridPlacer from '../../shared/GridPlacer'
import CalendarMovieSummary from './CalendarMovieSummary'

const CalendarEntryCard = ({ indexOffset = 32, ...showtime }) => {
  const length = useMemo(() => {
    return Math.ceil(showtime.movie.runtime / (15 * 60))
  }, [showtime])

  const index = useMemo(
    // adjust to start day at 8am
    () => formatAs.fifteenMinuteIndex(showtime.startTime) - indexOffset,
    [showtime.startTime, indexOffset]
  )

  useEffect(() => {
    if (!showtime.movie._id) {
      return
    }
  }, [showtime.movie._id])

  return (
    <>
      <GridPlacer orientation='column' start={index} endSpan={length}>
        <CalendarMovieSummary {...showtime} />
      </GridPlacer>
    </>
  )
}

export default CalendarEntryCard
