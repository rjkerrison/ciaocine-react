import { formatAs } from '../../utils/formatDate'
import CalendarMovieSummary from './CalendarMovieSummary'

const CalendarEntryCard = ({ ...showtime }) => {
  return (
    <div
      style={{
        gridRow: formatAs.fifteenMinuteIndex(showtime.startTime),
      }}
    >
      <CalendarMovieSummary {...showtime} />
    </div>
  )
}

export default CalendarEntryCard
