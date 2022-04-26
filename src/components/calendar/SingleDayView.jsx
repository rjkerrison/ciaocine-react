import { formatAs } from '../../utils/formatDate'
import CalendarEntryCard from './CalendarEntryCard'

const SingleDayView = ({ calendarDate, showtimes, remove }) => {
  return (
    <div className='calendar-date' key={calendarDate}>
      <h2 className='calendar-head'>{formatAs.date(calendarDate)}</h2>
      <div className='movies'>
        {showtimes.map((showtime) => (
          <CalendarEntryCard key={showtime._id} remove={remove} {...showtime} />
        ))}
      </div>
    </div>
  )
}

export default SingleDayView
