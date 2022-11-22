import { formatAs } from '../../utils/formatDate'
import { Deferred as AddToCalendar } from '../calendar/AddToCalendar'

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
      <div className='showtime-card-head'>
        <h4>{formatAs.time(startTime)}</h4>
        <div className='showtime-card-buttons'>
          <AddToCalendar {...{ _id, title, startTime, cinema }} />
        </div>
      </div>
      {showDate && <p>{formatAs.dateMonth(startTime)}</p>}
      <p className='extra-info'>{cinema.name}</p>
    </div>
  )
}

export default ShowtimeCard
