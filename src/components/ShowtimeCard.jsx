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
    <div className={`movie-showtime overlay-container ${className}`}>
      <h4>{formatAs.time(startTime)}</h4>
      {showDate && <p>{formatAs.dateMonth(startTime)}</p>}
      {cinema.name && (
        <div className='overlay'>
          <AddToCalendar showtimeId={_id} />
          <p className='extra-info'>
            <span>{cinema.name}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default ShowtimeCard
