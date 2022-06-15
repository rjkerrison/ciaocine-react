import { useContext } from 'react'
import { useState } from 'react'
import { getNearbyShowtimes } from '../api/nearby'
import { ToastContext } from '../context/ToastContext'
import { formatAs } from '../utils/formatDate'

const NearbySoon = () => {
  const { toast } = useContext(ToastContext)
  const [nearbyShowtimeInfo, setNearbyShowtimeInfo] = useState({
    cinemas: [],
    showtimes: [],
    movies: [],
  })

  const [geolocation, setGeolocation] = useState('Bastille')

  const { movies, showtimes, cinemas } = nearbyShowtimeInfo
  showtimes.sort(
    (a, b) =>
      formatAs.fifteenMinuteIndex(a.startTime) -
      formatAs.fifteenMinuteIndex(b.startTime)
  )

  const getMovie = (showtime) =>
    movies.find(({ _id }) => _id === showtime.movie)
  const getCinema = (showtime) =>
    cinemas.find(({ _id }) => _id === showtime.cinema)

  const currentPositionCallback = async (location) => {
    const { latitude: lat, longitude: lon } = location.coords

    getNearbyShowtimes({ lat, lon }).then(setNearbyShowtimeInfo)
  }

  const handleFindNearMe = () => {
    const result = navigator.geolocation.getCurrentPosition(
      currentPositionCallback,
      (error) => toast(`Could not locate you due to: "${error.message}."`)
    )
    console.log({ result })
  }

  return (
    <section className='movies-section'>
      <h1>Proche et bientôt</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          getNearbyShowtimes({ q: geolocation }).then(setNearbyShowtimeInfo)
        }}
      >
        <h3>By location</h3>
        <input
          type='text'
          name='location'
          value={geolocation}
          placeholder='filter by location'
          onChange={(e) => setGeolocation(e.target.value)}
        />
        <input type='submit' value='Find nearby' />
        <input type='button' value='Find near me' onClick={handleFindNearMe} />
      </form>
      {showtimes.map((showtime) => (
        <p key={showtime._id}>
          {getMovie(showtime).title} is playing at {getCinema(showtime).name} at{' '}
          {formatAs.time(showtime.startTime)}
        </p>
      ))}
    </section>
  )
}

export default NearbySoon
