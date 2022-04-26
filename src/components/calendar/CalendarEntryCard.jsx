import { formatAs } from '../../utils/formatDate'
import CalendarMovieSummary from './CalendarMovieSummary'

const CalendarEntryCard = ({ remove, ...showtime }) => {
  return (
    <div
      style={{
        gridRow: formatAs.fifteenMinuteIndex(showtime.startTime),
      }}
    >
      <CalendarMovieSummary {...showtime} remove={remove} />
    </div>
  )
}

export default CalendarEntryCard
