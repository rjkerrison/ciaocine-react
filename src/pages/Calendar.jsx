import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { API_URL } from '../utils/consts'
import { formatAs } from '../utils/formatDate'

const Calendar = () => {
  const [calendarByDay, setCalendarByDay] = useState([])
  const { isLoggedIn, isLoading, token } = useContext(AuthContext)

  useEffect(() => {
    if (!isLoggedIn || !token) {
      return
    }

    const getCalendar = async () => {
      const {
        data: { calendar },
      } = await axios({
        baseURL: API_URL,
        url: '/calendar',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCalendarByDay(calendar)
    }
    getCalendar()
  }, [calendarByDay, token, isLoggedIn])

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

  const removeShowtimeFromCalendar = async (id) => {
    const config = {
      method: 'delete',
      baseURL: API_URL,
      url: `/calendar/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios(config)
    console.log(data)
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
                    onClick={() => removeShowtimeFromCalendar(_id)}
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
