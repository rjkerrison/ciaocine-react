import { formatAs } from '../../utils/formatDate'
import AddToCalendar from '../calendar/AddToCalendar'

import './ShowtimeCard.scss'

const ShowtimeCard = ({
  _id,
  startTime,
  cinema,
  className,
  title,
  showDate = false,
}) => {
  return (
    <div className={`showtime-card ${className}`}>
      <h4>{formatAs.time(startTime)}</h4>
      {showDate && <p>{formatAs.dateMonth(startTime)}</p>}
      <p className='extra-info'>{cinema.name}</p>
      <div className='showtime-card-buttons'>
        <AddToCalendar {...{ _id, title, startTime, cinema }} />
      </div>
    </div>
  )
}

export default ShowtimeCard
