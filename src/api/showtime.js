import service from './service'

export const getShowtimeData = async (showtimeId) => {
  const {
    data: { showtime },
  } = await service.request({
    url: `/showtimes/${showtimeId}/`,
  })
  return showtime
}
