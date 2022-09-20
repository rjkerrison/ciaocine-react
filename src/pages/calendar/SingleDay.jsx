import { useEffect, useState, useContext, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import CalendarDayChooser from '../../components/calendar/CalendarDayChooser'
import SingleDayView from '../../components/calendar/SingleDayView'
import { AuthContext } from '../../context/AuthContext'
import { CalendarContext } from '../../context/CalendarContext'
import { areSameDay, formatAs } from '../../utils/formatDate'

const SingleDay = ({ year, month, date }) => {
  const { user } = useContext(AuthContext)
  const { getCalendarForUsername } = useContext(CalendarContext)
  const { username } = useParams()

  const [calendarByDay, setCalendarByDay] = useState([])

  // This needs to be delayed until after mount
  // in case SingleDay is loaded on initial mount of the whole App
  useEffect(
    () => setCalendarByDay(getCalendarForUsername(username)),
    [username, getCalendarForUsername]
  )

  const calendarDay = useMemo(
    () =>
      calendarByDay.find(({ calendarDate }) => {
        return areSameDay(calendarDate, { year, month, date })
      }),
    [calendarByDay, year, month, date]
  )

  const calendar = calendarDay ? (
    <SingleDayView {...calendarDay} />
  ) : (
    <p>
      You don't appear to have any saved screenings. Use the{' '}
      <Link to='/showtimes'>showtimes</Link> page to find something to watch, or
      search by <Link to='/cinemas'>cinema</Link>.
    </p>
  )

  return (
    <section className='movies-section'>
      <h1>
        {user?.username === username ? 'Your' : `${username}'s`} saved
        screenings for {formatAs.weekdayDate({ year, month, date })}
      </h1>
      <CalendarDayChooser {...{ username, calendarByDay, year, month, date }} />
      {calendar}
    </section>
  )
}

export default SingleDay
