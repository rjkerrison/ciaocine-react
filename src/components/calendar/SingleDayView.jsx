import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { formatAs } from '../../utils/formatDate'
import { getCalendarRoute } from '../../utils/routeHelpers'
import CalendarEntryCard from './CalendarEntryCard'
import SidebarTime from './SidebarTime'

const summariseShowtimes = (showtimes) => {
  const earliestStart = new Date(showtimes[0].startTime)

  const latestFinish = showtimes.reduce((latest, showtime) => {
    const startTimeMs = new Date(showtime.startTime) * 1
    const runtimeMs = showtime.movie.runtime * 1000
    const endtimeMs = startTimeMs + runtimeMs
    const endtime = new Date(endtimeMs)
    console.log({
      startTime: showtime.startTime,
      startTimeMs,
      runtimeMs,
      endtimeMs,
      endtime,
      latest,
      showtime,
    })
    if (endtime > latest) {
      return endtime
    }

    return latest
  }, earliestStart)

  const creneaux =
    1 +
    formatAs.fifteenMinuteIndex(latestFinish) -
    formatAs.fifteenMinuteIndex(earliestStart)

  return { earliestStart, latestFinish, creneaux }
}

const SingleDayView = ({ calendarDate, showtimes, username }) => {
  const { earliestStart, latestFinish, creneaux } = useMemo(() => {
    return summariseShowtimes(showtimes)
  }, [showtimes])

  const startingHours = useMemo(() => {
    const startTime = new Date(earliestStart)

    const hours = []
    let hour = startTime

    while (hour < latestFinish && hours.length < 24) {
      hours.push(hour)

      const nextHour = new Date(hour)
      nextHour.setMinutes(0)
      nextHour.setHours(hour.getHours() + 1)
      hour = nextHour
    }

    return hours
  }, [earliestStart, latestFinish])

  const indexOffset = useMemo(
    () => formatAs.fifteenMinuteIndex(startingHours[0]) - 1,
    [startingHours]
  )

  return (
    <div className='calendar-date' key={calendarDate}>
      <Link to={getCalendarRoute({ username, calendarDate })}>
        <h3 className='calendar-head'>{formatAs.date(calendarDate)}</h3>
      </Link>
      <div className='movies' style={{ '--row-count': creneaux }}>
        {startingHours.map((hour) => (
          <SidebarTime
            time={hour}
            gridRowStart={
              (formatAs.fifteenMinuteIndex(hour) - indexOffset + 96) % 96
            }
          />
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
