import service from './service'

const getCinemas = async () => {
  const {
    data: { cinemas },
  } = await service.request({
    url: '/cinemas',
  })
  return cinemas
}

const getNearbyCinemas = async ({ lat, lon, q }) => {
  const {
    data: { cinemas },
  } = await service.request({
    url: '/cinemas/nearby',
    params: {
      lat,
      lon,
      q,
    },
  })
  return cinemas
}

const getCinema = async (cinemaIdOrSlug) => {
  const {
    data: { cinema },
  } = await service.request({
    url: `/cinemas/${cinemaIdOrSlug}`,
  })
  return cinema
}

export { getCinema, getCinemas, getNearbyCinemas }
