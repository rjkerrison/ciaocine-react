import { useContext, useEffect, useState } from 'react'
import { getCinemas } from '../api/cinemas'
import CinemaCard from '../components/cinemas/CinemaCard'
import SearchBar from '../components/cinemas/SearchBar'
import { LikedContext } from '../context/LikedContext'

const Cinemas = () => {
  const { likedCinemas } = useContext(LikedContext)

  const [cinemas, setCinemas] = useState([])
  const [filteredCinemas, setFilteredCinemas] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const updateCinemas = async () => {
      const cinemas = await getCinemas()
      setCinemas(cinemas)
    }

    updateCinemas()
  }, [])

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

  return (
    <section className='movies-section'>
      <h1>Cinemas in Paris</h1>
      <SearchBar query={query} setQuery={setQuery} setCinemas={setCinemas} />
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
