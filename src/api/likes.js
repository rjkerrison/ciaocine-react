import { getHeadersWithAuth } from './auth'
import service from './service'

const likeCinema = async (cinemaId, liked) => {
  const config = {
    method: liked ? 'delete' : 'post',
    url: `/likes/cinemas/${cinemaId}`,
    headers: getHeadersWithAuth(),
    data: { liked: !liked },
  }
  try {
    await service.request(config)
    return { liked: !liked }
  } catch (error) {
    console.error(error)
  }
}

const getLikedCinemas = async () => {
  const config = {
    url: `/likes/cinemas/`,
    headers: getHeadersWithAuth(),
  }
  try {
    const {
      data: { cinemas },
    } = await service.request(config)
    return cinemas
  } catch (error) {
    console.error(error)
  }
}

export { likeCinema, getLikedCinemas }
