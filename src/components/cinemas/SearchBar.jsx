import { useContext, useState } from 'react'
import { getNearbyCinemas } from '../../api/cinemas'
import { ToastContext } from '../../context/ToastContext'

import './SearchBar.scss'

const SearchBar = ({ query, setQuery, setCinemas }) => {
  const { toast } = useContext(ToastContext)
  const [location, setLocation] = useState('Bastille')

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
    <div className='search-bar'>
      <h2>Search</h2>
      <form>
        <h3>By name</h3>
        <input
          type='text'
          name='name'
          value={query}
          placeholder='filter by name'
          onChange={handleQueryChange}
        />
      </form>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const cinemas = await getNearbyCinemas({
            q: `${location}, Paris, France`,
          })
          setCinemas(cinemas)
        }}
      >
        <h3>By location</h3>
        <input
          type='text'
          name='location'
          value={location}
          placeholder='filter by location'
          onChange={(e) => setLocation(e.target.value)}
        />
        <input type='submit' value='Find nearby' />
        <input type='button' value='Find near me' onClick={handleFindNearMe} />
      </form>
    </div>
  )
}

export default SearchBar
