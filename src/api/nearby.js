import service from './service'

const getNearbyShowtimes = async ({ lat, lon, q }) => {
  const { data } = await service.request({
    url: '/showtimes/nearby/soon',
    params: {
      lat,
      lon,
      q,
    },
  })
  return data
}
export { getNearbyShowtimes }
