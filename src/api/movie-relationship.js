import { getHeadersWithAuth } from './auth'
import service from './service'

const endpoints = {
  watches: 'watch',
  dismisses: 'dismiss',
  wants: 'want',
}

export const makeMetadataRequest = async ({
  slug,
  key,
  method = 'post',
  data,
}) => {
  const {
    data: { relationship },
  } = await service.request({
    method,
    url: `/movies/${slug}/${endpoints[key]}`,
    data,
    headers: getHeadersWithAuth(),
  })
  return { relationship }
}

export const getMetadata = async (movies) => {
  const config = {
    url: `/metadata`,
    headers: getHeadersWithAuth(),
    params: {
      movies,
    },
  }
  try {
    const { data } = await service.request(config)
    return data
  } catch (error) {
    console.error(error)
  }
}
