import { formatAs } from '../../utils/formatDate'
import MovieHeading from '../MovieHeading'

const CalendarMovieSummary = ({ movie, startTime, cinema }) => {
  return (
    <div className='movie calendar-movie'>
      <p className='time'>{formatAs.time(startTime)}</p>
      <MovieHeading {...movie} />
      <p className='cinema'>{cinema.name}</p>
    </div>
  )
}

export default CalendarMovieSummary
