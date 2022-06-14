import { Link } from 'react-router-dom'
import { formatAs } from '../../utils/formatDate'
import MovieHeading from '../MovieHeading'
import AddToCalendar from './AddToCalendar'
import './CalendarMovieSummary.scss'

const CalendarMovieSummary = ({
  movie,
  startTime,
  cinema,
  _id,
  runtime = 120,
}) => {
  const endTime = new Date(startTime) - 0 + runtime * 60 * 1000
  console.log({ endTime })
  return (
    <div className='movie calendar-movie'>
      <p className='time'>
        {formatAs.time(startTime)} to {formatAs.time(endTime)}
      </p>
      <MovieHeading {...movie} />
      <p className='cinema' title={cinema.address + ', ' + cinema.zipcode}>
        <Link to={`/cinemas/${cinema.slug}/${formatAs.routeDate(startTime)}`}>
          {cinema.name}
        </Link>
      </p>
      <AddToCalendar {...{ movie, startTime, cinema, _id }} />
    </div>
  )
}

export default CalendarMovieSummary
