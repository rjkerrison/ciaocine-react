import { getHeadersWithAuth } from './auth'
import service from './service'

const postRelationship = async (movieId, relationshipType, data) => {
  const {
    data: { relationship },
  } = await service.request({
    method: 'post',
    url: `/movies/${movieId}/${relationshipType}`,
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

export const postWatch = async (movieId, rating = 10) =>
  await postRelationship(movieId, 'watch', { rating })

export const postDismiss = async (movieId) =>
  await postRelationship(movieId, 'dismiss')

export const postWant = async (movieId) =>
  await postRelationship(movieId, 'want')
