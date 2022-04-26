import { formatAs } from '../../utils/formatDate'
import CalendarMovieSummary from './CalendarMovieSummary'

const SingleDayView = ({ calendarDate, showtimes, remove }) => {
  return (
    <div className='calendar-date' key={calendarDate}>
      <h2 className='calendar-head'>{formatAs.date(calendarDate)}</h2>
      <div className='movies'>
        {showtimes.map(({ _id, movie, cinema, startTime }) => (
          <div
            key={_id}
            style={{
              gridRow: formatAs.fifteenMinuteIndex(startTime),
            }}
          >
            <p>{formatAs.time(startTime)}</p>
            <CalendarMovieSummary
              movie={movie}
              cinema={cinema}
              startTime={startTime}
            />
            <button
              className='remove-from-calendar'
              onClick={() => remove(_id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SingleDayView
