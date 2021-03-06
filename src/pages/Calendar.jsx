import { useContext } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import SingleDayView from '../components/calendar/SingleDayView'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import { AuthContext } from '../context/AuthContext'
import { CalendarContext } from '../context/CalendarContext'
import { getCalendarRoute } from '../utils/routeHelpers'

const Calendar = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)
  const { getCalendarForUsername, getCalendarForUser } =
    useContext(CalendarContext)
  const { username } = useParams()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!username) {
    if (!isLoggedIn) {
      return (
        <Navigate to='/auth/login' state={{ redirect: getCalendarRoute() }} />
      )
    } else {
      return (
        <Navigate
          to={getCalendarRoute({ username: user.username })}
          replace={true}
        />
      )
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
        <Link to='/showtimes'>showtimes</Link> page to find something to watch,
        or search by <Link to='/cinemas'>cinema</Link>.
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
