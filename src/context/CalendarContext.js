import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { addToCalendar, getCalendar, removeFromCalendar } from '../api/calendar'
import { AuthContext } from './AuthContext'

const CalendarContext = createContext()

const CalendarContextProvider = ({ children }) => {
  const [calendarByDay, setCalendarByDay] = useState([])
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  useEffect(() => {
    if (isLoading || !isLoggedIn) {
      return
    }

    getCalendar()
      .then((calendar) => {
        setCalendarByDay(calendar)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [isLoggedIn, isLoading])

  const allShowtimesInCalendar = useMemo(
    () => calendarByDay.flatMap((day) => day.showtimes.map((s) => s._id)),
    [calendarByDay]
  )
  const getIsInCalendar = useCallback(
    (s) => allShowtimesInCalendar.includes(s._id),
    [allShowtimesInCalendar]
  )

  const remove = async (id) => {
    const result = await removeFromCalendar(id)
    const calendar = await getCalendar()

    setCalendarByDay(calendar)
    return result
  }

  const add = async (id) => {
    const result = await addToCalendar(id)
    const calendar = await getCalendar()

    setCalendarByDay(calendar)
    return result
  }

  return (
    <CalendarContext.Provider
      value={{
        calendarByDay,
        getIsInCalendar,
        remove,
        add,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export { CalendarContextProvider, CalendarContext }
