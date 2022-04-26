import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getCalendar, removeFromCalendar } from '../api/calendar'
import SingleDayView from '../components/calendar/SingleDayView'
import MovieShowtimeSummary from '../components/movies/MovieShowtimeSummary'
import { AuthContext } from '../context/AuthContext'
import { formatAs } from '../utils/formatDate'

const Calendar = () => {
  const [calendarByDay, setCalendarByDay] = useState([])
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }

    getCalendar()
      .then((calendar) => {
        setCalendarByDay(calendar)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [isLoggedIn])

  const remove = async (id) => {
    await removeFromCalendar(id)
    getCalendar().then((calendar) => {
      setCalendarByDay(calendar)
    })
  }

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
            remove={remove}
          />
        ))}
      </div>
    </section>
  )
}

export default Calendar
