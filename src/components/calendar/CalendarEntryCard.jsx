import { formatAs } from '../../utils/formatDate'
import CalendarMovieSummary from './CalendarMovieSummary'

const CalendarEntryCard = ({ ...showtime }) => {
  // adjust to start day at 8am
  const index = formatAs.fifteenMinuteIndex(showtime.startTime) - 32

  return (
    <>
      <div
        style={{
          gridRow: index,
          gridColumn: 'span 1',
          textAlign: 'right',
          borderTop: '1px solid black',
        }}
      >
        {formatAs.time(showtime.startTime)}
      </div>
      <div
        style={{
          gridRowStart: index,
          gridRowEnd: 'span 8',
        }}
      >
        <CalendarMovieSummary {...showtime} />
      </div>
    </>
  )
}

export default CalendarEntryCard
