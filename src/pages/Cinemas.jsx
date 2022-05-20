import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCinemas } from '../api/cinemas'
import FavouriteCinema from '../components/FavouriteCinema'
import { LikesContext } from '../context/LikesContext'

const Cinemas = () => {
  const { likedCinemas, changeLikeCinema } = useContext(LikesContext)
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
              <Link to={`/cinemas/${cinema._id}`}>{cinema.name}</Link>
            </h2>

            <div className='address'>
              <p>
                {cinema.address} {cinema.zipcode} {cinema.city}
              </p>
              <FavouriteCinema
                likedCinemas={likedCinemas}
                cinema={cinema}
                setLiked={changeLikeCinema}
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
