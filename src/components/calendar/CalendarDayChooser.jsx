import { useState } from 'react'
import { Link } from 'react-router-dom'
import { areSameDay, formatAs } from '../../utils/formatDate'
import { getCalendarRoute } from '../../utils/routeHelpers'

import './CalendarDayChooser.scss'

const CalendarDayChooser = ({ calendarByDay, year, month, date, username }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={['calendar-tabs', isOpen ? 'open' : ''].join(' ')}
      onClick={() => setIsOpen((o) => !o)}
    >
      {calendarByDay.map(({ calendarDate, showtimes }, index) => (
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
