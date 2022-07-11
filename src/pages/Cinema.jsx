import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCinema } from '../api/cinemas'
import CinemaHeader from '../components/cinemas/CinemaHeader'
import ShowtimeList from '../components/showtimes/ShowtimeList'

const Cinema = () => {
  const navigate = useNavigate()
  const { cinemaIdOrSlug, year, month, date } = useParams()

  const [cinema, setCinema] = useState(null)

  useEffect(() => {
    getCinema(cinemaIdOrSlug)
      .then(setCinema)
      .catch(({ response }) => {
        console.log(response)
        if (response.status === 404) {
          navigate('/not-found', { replace: true })
        }
      })
  }, [cinemaIdOrSlug, navigate])

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
