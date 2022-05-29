import { useContext } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import SingleDayView from '../components/calendar/SingleDayView'
import { AuthContext } from '../context/AuthContext'
import { CalendarContext } from '../context/CalendarContext'
import { areSameDay, formatAs } from '../utils/formatDate'
import { getCalendarRoute } from '../utils/routeHelpers'

const CalendarSingleDay = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)
  const { getCalendarForUsername, getCalendarForUser } =
    useContext(CalendarContext)
  const { username, year, month, date } = useParams()

  if (isLoading) {
    return (
      <section>
        <p>Loading</p>
      </section>
    )
  }

  if (!username) {
    if (!isLoggedIn) {
      return <Navigate to='/auth/login' />
    } else {
      return (
        <Navigate to={`/calendar/${user.username}/${year}/${month}/${date}`} />
      )
    }
  }

  const calendarByDay = username
    ? getCalendarForUsername(username)
    : getCalendarForUser()

  let calendar
  const calendarDay = calendarByDay.find(({ calendarDate }) => {
    return areSameDay(calendarDate, { year, month, date })
  })
  if (calendarDay) {
    calendar = (
      <div className='calendar'>
        <SingleDayView {...calendarDay} />
      </div>
    )
  } else {
    calendar = (
      <p>
        You don't appear to have any saved screenings. Use the{' '}
        <Link to='/showtimes'>showtimes</Link> page to find something to watch,
        or search by <Link to='/cinemas'>cinema</Link>.
      </p>
    )
  }

  return (
    <section className='movies-section'>
      <h1>Your saved screenings</h1>
      {calendar}
      <ul>
        {calendarByDay.map(({ calendarDate }) => {
          if (areSameDay(calendarDate, { year, month, date })) {
            return null
          }
          return (
            <li key={calendarDate}>
              View calendar for{' '}
              <Link to={getCalendarRoute({ username, calendarDate })}>
                {formatAs.date(calendarDate)}
              </Link>
              .
            </li>
          )
        })}
        <li>
          View <Link to={getCalendarRoute({ username })}>full calendar</Link>.
        </li>
      </ul>
    </section>
  )
}

export default CalendarSingleDay
