import { Link } from 'react-router-dom'

import { formatAs } from '../../utils/formatDate'
import { getCalendarRoute } from '../../utils/routeHelpers'

import Grid from './Grid'

const SingleDayView = ({ calendarDate, showtimes, username }) => {
  return (
    <div className='calendar-date' key={calendarDate}>
      <Link to={getCalendarRoute({ username, calendarDate })}>
        <h3 className='calendar-head'>{formatAs.weekdayDate(calendarDate)}</h3>
      </Link>

      <Grid
        {...{
          showtimes,
        }}
      />
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
