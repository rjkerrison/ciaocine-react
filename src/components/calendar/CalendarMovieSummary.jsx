import { Link } from 'react-router-dom'
import { formatAs } from '../../utils/formatDate'
import MovieHeading from '../MovieHeading'
import ExternalLinks from '../movies/ExternalLinks'
import FloatingButtons from '../shared/FloatingButtons'
import AddToCalendar from './AddToCalendar'
import './CalendarMovieSummary.scss'
import ConcurrencyExclusionButton from './ConcurrencyExclusionButton'

const CalendarMovieSummary = ({ movie, startTime, cinema, _id }) => {
  const endTime = new Date(startTime) - 0 + (movie.runtime || 7200) * 1000
  return (
    <div className='movie calendar-movie'>
      <MovieHeading {...movie} />
      <ExternalLinks {...movie} />
      <p className='time'>
        {formatAs.time(startTime)} à&nbsp;{formatAs.time(endTime)}
      </p>
      <p className='cinema' title={cinema.address + ', ' + cinema.zipcode}>
        <Link to={`/cinemas/${cinema.slug}/${formatAs.routeDate(startTime)}`}>
          {cinema.name}
        </Link>
      </p>
      <FloatingButtons>
        <ConcurrencyExclusionButton {...{ _id, startTime, movie }} />
        <AddToCalendar {...{ title: movie.title, startTime, cinema, _id }} />
      </FloatingButtons>
    </div>
  )
}

export default CalendarMovieSummary
