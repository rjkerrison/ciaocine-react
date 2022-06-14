import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCinema } from '../api/cinemas'
import CinemaCard from '../components/cinemas/CinemaCard'
import ShowtimeList from '../components/showtimes/ShowtimeList'

const Cinema = () => {
  const { cinemaIdOrSlug, year, month, date } = useParams()

  const [cinema, setCinema] = useState({})

  useEffect(() => {
    getCinema(cinemaIdOrSlug).then(setCinema)
  }, [cinemaIdOrSlug])

  return (
    <main>
      <CinemaCard {...cinema} />

      <ShowtimeList {...{ cinemaIdOrSlug, year, month, date }} />
    </main>
  )
}

export default Cinema
