import { formatAs } from '../../utils/formatDate'
import MovieHeading from '../MovieHeading'
import './CalendarMovieSummary.css'

const CalendarMovieSummary = ({ movie, startTime, cinema, remove, _id }) => {
  return (
    <div className='movie calendar-movie'>
      <p className='time'>{formatAs.time(startTime)}</p>
      <MovieHeading {...movie} />
      <p className='cinema'>{cinema.name}</p>
      <button
        className='remove-from-calendar round'
        onClick={() => remove(_id)}
      >
        -
      </button>
    </div>
  )
}

export default CalendarMovieSummary
