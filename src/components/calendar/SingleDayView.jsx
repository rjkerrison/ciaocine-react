import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { formatAs } from '../../utils/formatDate'
import { getCalendarRoute } from '../../utils/routeHelpers'
import CalendarEntryCard from './CalendarEntryCard'
import SidebarTime from './SidebarTime'

const SingleDayView = ({ calendarDate, showtimes, username }) => {
  const earliestShowtime = showtimes[0].startTime

  const startingHours = useMemo(() => {
    const startTime = new Date(earliestShowtime)
    startTime.setMinutes(0)

    const hours = [startTime]
    let previousHour = startTime

    while (
      previousHour.getDate() === startTime.getDate() &&
      hours.length < 24
    ) {
      const hour = new Date(previousHour)
      console.log(hour)
      hour.setHours(hour.getHours() + 1)
      hours.push(hour)
      previousHour = hour
      console.log(hours)
    }

    return hours
  }, [earliestShowtime])

  const indexOffset = useMemo(
    () => formatAs.fifteenMinuteIndex(startingHours[0]) - 1,
    [startingHours]
  )

  return (
    <div className='calendar-date' key={calendarDate}>
      <Link to={getCalendarRoute({ username, calendarDate })}>
        <h3 className='calendar-head'>{formatAs.date(calendarDate)}</h3>
      </Link>
      <div className='movies'>
        {startingHours.map((hour, i) => (
          <SidebarTime time={hour} gridRowStart={1 + i * 4} />
        ))}

        {showtimes.map((showtime) => (
          <CalendarEntryCard
            key={showtime._id}
            indexOffset={indexOffset}
            {...showtime}
          />
        ))}
      </div>
      <p>
        Find more{' '}
        <Link to={`/showtimes/${formatAs.routeDate(calendarDate)}`}>
          showtimes for {formatAs.date(calendarDate)}
        </Link>
        .
      </p>
    </div>
  )
}

export default SingleDayView
