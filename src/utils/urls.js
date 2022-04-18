const posters = [
  '//editorial.designtaxi.com/news-sharkmovie2607/1.jpg',
  '//editorial.designtaxi.com/news-sharkmovie2607/2.jpg',
  '//editorial.designtaxi.com/news-sharkmovie2607/3.jpg',
  '//editorial.designtaxi.com/news-sharkmovie2607/4.jpg',
  '//editorial.designtaxi.com/news-sharkmovie2607/5.jpg',
  '//editorial.designtaxi.com/news-sharkmovie2607/6.jpg',
  '//editorial.designtaxi.com/news-sharkmovie2607/7.jpg',
  '//editorial.designtaxi.com/news-sharkmovie2607/8.jpg',
]

const getRandomPosterUrl = () =>
  posters[Math.floor(Math.random() * posters.length)]

export const stripProtocol = (url) => {
  if (!url) {
    url = getRandomPosterUrl()
  }

  return url?.replace(/^http(s?):\/\//, '//')
}
