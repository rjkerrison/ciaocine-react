import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCinema } from '../api/cinemas'
import CinemaHeader from '../components/cinemas/CinemaHeader'
import ShowtimeList from '../components/showtimes/ShowtimeList'

const Cinema = () => {
  const { cinemaIdOrSlug, year, month, date } = useParams()

  const [cinema, setCinema] = useState(null)

  useEffect(() => {
    getCinema(cinemaIdOrSlug).then(setCinema)
  }, [cinemaIdOrSlug])

  if (!cinema) {
    return <div className='centre loading'></div>
  }

  return (
    <main>
      <CinemaHeader {...cinema} />

      <ShowtimeList
        {...{ cinemaIdOrSlug, year, month, date }}
        title={`Séances à ${cinema.name}`}
      />
    </main>
  )
}

export default Cinema
