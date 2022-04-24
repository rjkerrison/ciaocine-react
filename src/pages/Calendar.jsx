import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getCalendar, removeFromCalendar } from '../api/calendar'
import { AuthContext } from '../context/AuthContext'
import { formatAs } from '../utils/formatDate'

const Calendar = () => {
  const [calendarByDay, setCalendarByDay] = useState([])
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }

    getCalendar().then((calendar) => {
      setCalendarByDay(calendar)
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
          <div className='calendar-date' key={calendarDate}>
            <h2 className='calendar-head'>{formatAs.date(calendarDate)}</h2>
            <div className='movies'>
              {showtimes.map(({ _id, movie, cinema, startTime }) => (
                <div
                  key={_id}
                  className='movie overlay-container expander-container calendar-entry'
                >
                  <div className='movie-heading'>
                    <h3>{movie.title}</h3>
                    {cinema.name}
                  </div>
                  <div className='movie-showtime'>
                    <p>{formatAs.time(startTime)}</p>
                  </div>
                  <button
                    className='remove-from-calendar'
                    onClick={() => remove(_id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Calendar
