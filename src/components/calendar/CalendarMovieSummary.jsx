import { formatAs } from '../../utils/formatDate'
import MovieHeading from '../MovieHeading'
import './CalendarMovieSummary.css'
import RemoveFromCalendar from './RemoveFromCalendar'

const CalendarMovieSummary = ({ movie, startTime, cinema, _id }) => {
  return (
    <div className='movie calendar-movie'>
      <p className='time'>{formatAs.time(startTime)}</p>
      <MovieHeading {...movie} />
      <p className='cinema'>{cinema.name}</p>
      <RemoveFromCalendar {...{ movie, startTime, cinema, _id }} />
    </div>
  )
}

export default CalendarMovieSummary
