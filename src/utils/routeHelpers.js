import { formatAs } from './formatDate'

export const getCalendarRoute = ({ username, calendarDate } = {}) => {
  const parts = ['calendar']
  if (username) {
    parts.push(username)
  }
  if (calendarDate) {
    parts.push(formatAs.routeDate(calendarDate))
  }
  return `/${parts.join('/')}`
}
