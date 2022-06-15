import { useContext, useEffect, useState } from 'react'
import { getCinemas, getNearbyCinemas } from '../api/cinemas'
import CinemaCard from '../components/cinemas/CinemaCard'
import { LikedContext } from '../context/LikedContext'
import { ToastContext } from '../context/ToastContext'

const Cinemas = () => {
  const { likedCinemas } = useContext(LikedContext)
  const { toast } = useContext(ToastContext)
  const [cinemas, setCinemas] = useState([])
  const [filteredCinemas, setFilteredCinemas] = useState([])
  const [query, setQuery] = useState('')

  const updateCinemas = async () => {
    const cinemas = await getCinemas()
    setCinemas(cinemas)
  }

  useEffect(() => {
    updateCinemas()
  }, [])

  useEffect(() => {
    console.log(cinemas.length)
  }, [cinemas])

  useEffect(() => {
    const filtered = cinemas.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    )
    if (likedCinemas) {
      const ids = likedCinemas.map((a) => a.cinema._id)
      filtered.sort((a, b) => ids.indexOf(b._id) - ids.indexOf(a._id))
    }

    setFilteredCinemas(filtered)
  }, [query, cinemas, likedCinemas])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const currentPositionCallback = async (location) => {
    const { latitude: lat, longitude: lon } = location.coords

    const cinemas = await getNearbyCinemas({ lat, lon })
    setCinemas(cinemas)
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
      <h1>Cinemas in Paris</h1>
      <form className='search-bar'>
        <input
          type='text'
          value={query}
          placeholder='filter by name'
          onChange={handleQueryChange}
        />
        <input type='button' value='Find near me' onClick={handleFindNearMe} />
        <input
          type='button'
          value='Find near Bastille'
          onClick={async () => {
            const cinemas = await getNearbyCinemas({ q: 'Bastille, Paris' })
            setCinemas(cinemas)
          }}
        />
      </form>
      <ul className='cinema-list'>
        {filteredCinemas.map((cinema) => (
          <li className='cinema' key={cinema._id}>
            <CinemaCard {...cinema} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Cinemas
