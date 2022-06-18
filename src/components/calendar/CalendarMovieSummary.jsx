import { Link } from 'react-router-dom'
import { formatAs } from '../../utils/formatDate'
import MovieHeading from '../MovieHeading'
import AddToCalendar from './AddToCalendar'
import './CalendarMovieSummary.scss'

const CalendarMovieSummary = ({ movie, startTime, cinema, _id }) => {
  const endTime = new Date(startTime) - 0 + (movie.runtime || 7200) * 1000
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
