import { Suspense, useEffect, useState } from 'react'
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

  return (
    <Suspense fallback={<div className='centre loading'></div>}>
      <main>
        <CinemaHeader {...cinema} />

        <ShowtimeList
          {...{ cinemaIdOrSlug, year, month, date }}
          title={`Séances à ${cinema.name}`}
        />
      </main>
    </Suspense>
  )
}

export default Cinema
