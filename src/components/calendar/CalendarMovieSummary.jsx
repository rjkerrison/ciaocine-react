import { Link } from 'react-router-dom'
import { formatAs } from '../../utils/formatDate'
import MovieHeading from '../MovieHeading'
import './CalendarMovieSummary.scss'
import RemoveFromCalendar from './RemoveFromCalendar'

const CalendarMovieSummary = ({ movie, startTime, cinema, _id }) => {
  const { year, month, date } = formatAs.yearMonthDate(startTime)

  return (
    <div className='movie calendar-movie'>
      <p className='time'>{formatAs.time(startTime)}</p>
      <MovieHeading {...movie} />
      <p className='cinema' title={cinema.address + ', ' + cinema.zipcode}>
        <Link to={`/cinemas/${cinema._id}/${year}/${month}/${date}`}>
          {cinema.name}
        </Link>
      </p>
      <RemoveFromCalendar {...{ movie, startTime, cinema, _id }} />
    </div>
  )
}

export default CalendarMovieSummary
