import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { addToCalendar, getCalendar, removeFromCalendar } from '../api/calendar'
import { AuthContext } from './AuthContext'

const CalendarContext = createContext()

const CalendarContextProvider = ({ children }) => {
  const [userCalendars, setUserCalendars] = useState({})
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  const getCalendarForUsername = useCallback(
    (username) => {
      const foundCalendar = userCalendars[username]
      if (foundCalendar) {
        return foundCalendar
      }
      getCalendar(username).then((calendar) => {
        setUserCalendars((calendars) => ({
          ...calendars,
          [username]: calendar,
        }))
      })
      return []
    },
    [userCalendars]
  )
  const getCalendarForUser = useCallback(() => {
    if (isLoading || !isLoggedIn || !user) {
      return []
    }
    return getCalendarForUsername(user.username)
  }, [isLoading, isLoggedIn, user, getCalendarForUsername])

  const allShowtimesInCalendar = useMemo(
    () =>
      getCalendarForUser().flatMap((day) => day.showtimes.map((s) => s._id)),
    [getCalendarForUser]
  )
  const getIsInCalendar = useCallback(
    (id) => allShowtimesInCalendar.includes(id),
    [allShowtimesInCalendar]
  )

  const remove = async (id) => {
    const result = await removeFromCalendar(id)
    await getCalendarForUser()
    return result
  }

  const add = async (id) => {
    const result = await addToCalendar(id)
    await getCalendarForUser()
    return result
  }

  return (
    <CalendarContext.Provider
      value={{
        getIsInCalendar,
        remove,
        add,
        getCalendarForUsername,
        getCalendarForUser,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export { CalendarContextProvider, CalendarContext }
