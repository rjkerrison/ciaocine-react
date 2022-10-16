import service from './service'

export const getMovieData = async (movieId) => {
  const {
    data: { movie, tmdbInfo },
  } = await service.request({
    url: `/movies/${movieId}/`,
    query: {
      limit: 25,
    },
  })
  return { ...movie, extra: tmdbInfo[0] }
}

export const searchMovies = async (searchTerm) => {
  const {
    data: { movies },
  } = await service.request({
    url: `/movies/search/${searchTerm}`,
  })
  return movies
}

export const getTopMovies = async () => {
  const {
    data: { movies },
  } = await service.request({
    url: `/movies/top/by/released`,
  })
  return movies
}
