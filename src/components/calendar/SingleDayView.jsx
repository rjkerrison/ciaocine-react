import { Link } from 'react-router-dom'
import { formatAs } from '../../utils/formatDate'
import CalendarEntryCard from './CalendarEntryCard'

const SingleDayView = ({ calendarDate, showtimes }) => {
  return (
    <div className='calendar-date' key={calendarDate}>
      <h3 className='calendar-head'>{formatAs.date(calendarDate)}</h3>
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
