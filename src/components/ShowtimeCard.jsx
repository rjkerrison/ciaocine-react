import { formatAs } from '../utils/formatDate'
import AddToCalendar from './AddToCalendar'

const ShowtimeCard = ({
  _id,
  startTime,
  cinema,
  className,
  showDate = false,
}) => {
  return (
    <div className={`movie-showtime ${className}`}>
      <h4>{formatAs.time(startTime)}</h4>
      {showDate && <p>{formatAs.dateMonth(startTime)}</p>}
      <p className='extra-info'>{cinema.name}</p>
      <AddToCalendar showtimeId={_id} />
    </div>
  )
}

export default ShowtimeCard
