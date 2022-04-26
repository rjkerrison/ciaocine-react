import { createContext, useContext, useEffect, useState } from 'react'
import { getCalendar, removeFromCalendar } from '../api/calendar'
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

  const remove = async (id) => {
    const result = await removeFromCalendar(id)
    const calendar = await getCalendar()

    setCalendarByDay(calendar)
    return result
  }

  return (
    <CalendarContext.Provider
      value={{
        calendarByDay,
        remove,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export { CalendarContextProvider, CalendarContext }
