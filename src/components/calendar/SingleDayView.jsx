import { Link } from 'react-router-dom'

import { formatAs } from '../../utils/formatDate'

import Grid from './Grid'

const SingleDayView = ({ calendarDate, showtimes }) => {
  return (
    <>
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
    </>
  )
}

export default SingleDayView
