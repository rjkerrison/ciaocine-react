import { useState } from 'react'
import { Link } from 'react-router-dom'
import { areSameDay, formatAs } from '../../utils/formatDate'
import { getCalendarRoute } from '../../utils/routeHelpers'

import './CalendarDayChooser.scss'

const CalendarDayChooser = ({ calendarByDay, year, month, date, username }) => {
  const [isOpen, setIsOpen] = useState(false)

  const calendarDayCollection = [...calendarByDay]
  if (
    !calendarByDay.some(({ calendarDate }) =>
      areSameDay(calendarDate, { year, month, date })
    )
  ) {
    // We need to have the selected date displayed even if it has no showtimes
    calendarDayCollection.push({
      calendarDate: { year, month, date },
      showtimes: [],
    })
  }

  return (
    <div
      className={['calendar-tabs', isOpen ? 'open' : ''].join(' ')}
      onClick={() => setIsOpen((o) => !o)}
    >
      {calendarDayCollection.map(({ calendarDate, showtimes }) => (
        <Link
          key={formatAs.date(calendarDate)}
          className={[
            'calendar-tab',
            areSameDay(calendarDate, { year, month, date }) ? 'selected' : '',
          ].join(' ')}
          to={getCalendarRoute({ username, calendarDate })}
        >
          <h3>{formatAs.dateMonth(calendarDate)}</h3>
          <p>{showtimes.length} showtimes</p>
        </Link>
      ))}
    </div>
  )
}

export default CalendarDayChooser
