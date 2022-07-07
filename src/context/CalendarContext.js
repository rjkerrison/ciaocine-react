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
  const [usernamesPendingRequests, setUsernamesPendingRequests] = useState([])
  const [selectedShowtimeIds, setSelectedShowtimeIds] = useState([])
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  const isSelectedShowtimeId = (id) => {
    return selectedShowtimeIds.includes(id)
  }

  const toggleSelectedShowtimeId = (id) => {
    setSelectedShowtimeIds((current) => {
      if (current.includes(id)) {
        return current.filter((x) => x !== id)
      }
      return [...current, id]
    })
  }

  const requestCalendarForUsername = useCallback(
    async (username) => {
      // No need to request pending calendars
      if (usernamesPendingRequests.includes(username)) {
        return
      }

      setUsernamesPendingRequests((v) => [...v, username])

      const calendar = await getCalendar(username)

      setUsernamesPendingRequests((v) => v.filter((x) => x !== username))
      setUserCalendars((calendars) => ({
        ...calendars,
        [username]: calendar,
      }))
    },
    [usernamesPendingRequests]
  )

  const getCalendarForUsername = useCallback(
    (username) => {
      const foundCalendar = userCalendars[username]
      if (foundCalendar) {
        return foundCalendar
      }

      requestCalendarForUsername(username)

      return []
    },
    [userCalendars, requestCalendarForUsername]
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
    await requestCalendarForUsername(user.username)
    return result
  }

  const add = async (id) => {
    const result = await addToCalendar(id)
    await requestCalendarForUsername(user.username)
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
        toggleSelectedShowtimeId,
        isSelectedShowtimeId,
        selectedShowtimeIds,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export { CalendarContextProvider, CalendarContext }
