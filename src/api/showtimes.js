import service from '../api/service'

const getShowtimes = async ({ source, yyyy, mm, dd, cinema, ...params }) => {
  const showtimeDateUrl = `/showtimes/${yyyy}/${mm + 1}/${dd}/`
  const url = cinema ? `/cinemas/${cinema}${showtimeDateUrl}` : showtimeDateUrl

  const {
    data: { movies },
  } = await service.request({
    cancelToken: source.token,
    url,
    params,
  })
  return { movies }
}

export { getShowtimes }
