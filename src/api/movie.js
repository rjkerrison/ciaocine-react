import service from './service'

export const getMovieData = async (movieId) => {
  const {
    data: { movie, tmdbInfo },
  } = await service.request({
    url: `/movies/${movieId}/`,
  })
  return { ...movie, extra: tmdbInfo[0] }
}
