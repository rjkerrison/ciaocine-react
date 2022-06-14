import { useParams } from 'react-router-dom'
import ShowtimeList from '../components/showtimes/ShowtimeList'

const Showtimes = () => {
  const { year, month, date } = useParams()

  return <ShowtimeList {...{ year, month, date }} />
}

export default Showtimes
