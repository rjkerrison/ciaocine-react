import { Link } from 'react-router-dom'
import { formatAs } from '../../utils/formatDate'
import { getCalendarRoute } from '../../utils/routeHelpers'
import CalendarEntryCard from './CalendarEntryCard'

const SingleDayView = ({ calendarDate, showtimes, username }) => {
  return (
    <div className='calendar-date' key={calendarDate}>
      <Link to={getCalendarRoute({ username, calendarDate })}>
        <h3 className='calendar-head'>{formatAs.date(calendarDate)}</h3>
      </Link>
      <div className='movies'>
        {showtimes.map((showtime) => (
          <CalendarEntryCard key={showtime._id} {...showtime} />
        ))}
      </div>
      <p>
        Find more{' '}
        <Link to={`/movies/${formatAs.routeDate(calendarDate)}`}>
          movies for {formatAs.date(calendarDate)}
        </Link>
        .
      </p>
    </div>
  )
}

export default SingleDayView
