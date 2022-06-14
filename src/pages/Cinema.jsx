import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCinema } from '../api/cinemas'
import CinemaHeader from '../components/cinemas/CinemaHeader'
import ShowtimeList from '../components/showtimes/ShowtimeList'

const Cinema = () => {
  const { cinemaIdOrSlug, year, month, date } = useParams()

  const [cinema, setCinema] = useState({})

  useEffect(() => {
    getCinema(cinemaIdOrSlug).then(setCinema)
  }, [cinemaIdOrSlug])

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
