import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavouriteCinema from '../components/FavouriteCinema'
import { AuthContext } from '../context/AuthContext'
import { API_URL } from '../utils/consts'

const Cinemas = () => {
  const { token, isLoggedIn, isLoading } = useContext(AuthContext)
  const [cinemas, setCinemas] = useState([])
  const [likedCinemas, setLikedCinemas] = useState([])
  const [filteredCinemas, setFilteredCinemas] = useState([])
  const [query, setQuery] = useState('')

  const getCinemas = async () => {
    const {
      data: { cinemas },
    } = await axios({
      baseURL: API_URL,
      url: '/cinemas',
    })
    setCinemas(cinemas)
  }

  useEffect(() => {
    getCinemas()
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

    const getLikedCinemas = async () => {
      const {
        data: { cinemas },
      } = await axios({
        baseURL: API_URL,
        url: '/likes/cinemas',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLikedCinemas(cinemas)
    }
    getLikedCinemas()
  }, [token, isLoading, isLoggedIn])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleFavouriteCinemaChange = (cinemaId, liked) => {
    if (liked) {
      const newEntry = { cinema: { _id: cinemaId } }
      setLikedCinemas([...cinemas, newEntry])
    } else {
      setLikedCinemas(likedCinemas.filter((x) => x !== cinemaId))
    }
  }

  return (
    <section>
      <input
        type='text'
        value={query}
        placeholder='filter by name'
        onChange={handleQueryChange}
      />
      <ul className='cinema-list'>
        {filteredCinemas.map((cinema) => (
          <li className='cinema'>
            <h2>
              <Link to={`/cinemas/${cinema._id}`}>{cinema.name}</Link>
            </h2>

            <div className='address'>
              <p>
                {cinema.address} {cinema.zipcode} {cinema.city}
              </p>
              {isLoggedIn && (
                <FavouriteCinema
                  likedCinemas={likedCinemas}
                  cinema={cinema}
                  setLiked={handleFavouriteCinemaChange}
                />
              )}
            </div>
            <ul className='member-card-list'>
              {cinema.member_cards?.map((card) => (
                <li className='member-card' data-code={card.code}>
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
