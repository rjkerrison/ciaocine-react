import service from './service'

const getCinemas = async () => {
  const {
    data: { cinemas },
  } = await service.request({
    url: '/cinemas',
  })
  return cinemas
}

export { getCinemas }
