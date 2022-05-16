import { useContext } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import SingleDayView from '../components/calendar/SingleDayView'
import { AuthContext } from '../context/AuthContext'
import { CalendarContext } from '../context/CalendarContext'

const Calendar = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)
  const { getCalendarForUsername, getCalendarForUser } =
    useContext(CalendarContext)
  const { username } = useParams()

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
      return <Navigate to={`/calendar/${user.username}`} />
    }
  }

  const calendarByDay = username
    ? getCalendarForUsername(username)
    : getCalendarForUser()

  let calendar
  if (calendarByDay.length > 0) {
    calendar = (
      <div className='calendar'>
        {calendarByDay.map(({ calendarDate, showtimes }) => (
          <SingleDayView
            username={username}
            calendarDate={calendarDate}
            showtimes={showtimes}
            key={calendarDate}
          />
        ))}
      </div>
    )
  } else {
    calendar = (
      <p>
        You don't appear to have any saved screenings. Use the{' '}
        <Link to='/movies'>movies</Link> page to find something to watch, or
        search by <Link to='/cinemas'>cinema</Link>.
      </p>
    )
  }

  return (
    <section className='movies-section'>
      <h1>Your saved screenings</h1>
      {calendar}
    </section>
  )
}

export default Calendar
