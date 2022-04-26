import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import SingleDayView from '../components/calendar/SingleDayView'
import { AuthContext } from '../context/AuthContext'
import {
  CalendarContext,
  CalendarContextProvider,
} from '../context/CalendarContext'

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

  return (
    <section>
      <h2>Your saved screenings</h2>
      <div className='calendar'>
        {calendarByDay.map(({ calendarDate, showtimes }) => (
          <SingleDayView
            calendarDate={calendarDate}
            showtimes={showtimes}
            key={calendarDate}
          />
        ))}
      </div>
    </section>
  )
}

const CalendarWithContext = () => {
  return (
    <CalendarContextProvider>
      <Calendar />
    </CalendarContextProvider>
  )
}

export default CalendarWithContext
