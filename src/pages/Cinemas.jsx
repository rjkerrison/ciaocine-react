import { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCinemas } from '../api/cinemas'
import { getLikedCinemas } from '../api/likes'
import FavouriteCinema from '../components/FavouriteCinema'
import { AuthContext } from '../context/AuthContext'

const Cinemas = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)
  const [cinemas, setCinemas] = useState([])
  const [likedCinemas, setLikedCinemas] = useState([])
  const [filteredCinemas, setFilteredCinemas] = useState([])
  const [query, setQuery] = useState('')

  const updateCinemas = async () => {
    const cinemas = await getCinemas()
    setCinemas(cinemas)
  }

  const updateLikedCinemas = async () => {
    const likedCinemas = await getLikedCinemas()
    setLikedCinemas(likedCinemas)
  }

  useEffect(() => {
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

  useEffect(() => {
    if (isLoading || !isLoggedIn) {
      return
    }

    updateLikedCinemas()
  }, [isLoading, isLoggedIn])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleFavouriteCinemaChange = useCallback((cinemaId, liked) => {
    if (liked) {
      const newEntry = { cinema: { _id: cinemaId } }
      setLikedCinemas((lc) => [...lc, newEntry])
    } else {
      setLikedCinemas((lc) => lc.filter((x) => x.cinema._id !== cinemaId))
    }
  }, [])

  return (
    <section className='movies-section'>
      <h1>Cinemas in Paris</h1>
      <input
        type='text'
        value={query}
        placeholder='filter by name'
        onChange={handleQueryChange}
      />
      <ul className='cinema-list'>
        {filteredCinemas.map((cinema) => (
          <li className='cinema' key={cinema._id}>
            <h2>
              <Link to={`/cinemas/${cinema.slug}`}>{cinema.name}</Link>
            </h2>

            <div className='address'>
              <p>
                {cinema.address} {cinema.zipcode} {cinema.city}
              </p>
              <FavouriteCinema
                likedCinemas={likedCinemas}
                cinema={cinema}
                setLiked={handleFavouriteCinemaChange}
              />
            </div>
            <ul className='member-card-list'>
              {cinema.member_cards?.map((card) => (
                <li className='member-card' key={card.code}>
                  {card.label}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Cinemas
