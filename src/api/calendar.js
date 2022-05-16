import { getHeadersWithAuth } from './auth'
import service from './service'

// takes a showtime id and adds it to the user's saved showtimes (calendar)
const addToCalendar = async (id) => {
  const config = {
    method: 'post',
    url: '/calendar',
    headers: getHeadersWithAuth(),
    data: { id },
  }
  try {
    await service.request(config)
    return { added: true }
  } catch (error) {
    console.error(error)
  }
}

// takes a calendar id and removes it from the user's saved showtimes (calendar)
const removeFromCalendar = async (id) => {
  const config = {
    method: 'delete',
    url: `/calendar/${id}`,
    headers: getHeadersWithAuth(),
  }
  try {
    await service.request(config)
    return { removed: true }
  } catch (error) {
    console.error(error)
  }
}

const getCalendar = async (username) => {
  const {
    data: { calendar },
  } = await service.request({
    url: `/calendar/${username}`,
  })
  return calendar
}

export { addToCalendar, removeFromCalendar, getCalendar }
