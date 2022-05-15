import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import SingleDayView from '../components/calendar/SingleDayView'
import { AuthContext } from '../context/AuthContext'
import { CalendarContext } from '../context/CalendarContext'

const Calendar = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)
  const { calendarByDay } = useContext(CalendarContext)

  if (isLoading) {
    return (
      <section>
        <p>Loading</p>
      </section>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to='/auth/login' />
  }

  let calendar
  if (calendarByDay.length > 0) {
    calendar = calendarByDay.map(({ calendarDate, showtimes }) => (
      <SingleDayView
        calendarDate={calendarDate}
        showtimes={showtimes}
        key={calendarDate}
      />
    ))
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
      <div className='calendar'>{calendar}</div>
    </section>
  )
}

export default Calendar
