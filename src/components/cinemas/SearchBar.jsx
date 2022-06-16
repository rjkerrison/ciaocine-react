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
    // ideally we'd get a human name for the location (quartier, street) from the API
    setLocation(`near me`)

    const cinemas = await getNearbyCinemas({ lat, lon })
    setCinemas(cinemas)
  }

  const handleFindNearMe = () => {
    navigator.geolocation.getCurrentPosition(currentPositionCallback, (error) =>
      toast(`Could not locate you due to: "${error.message}."`)
    )
  }

  return (
    <div className='search-bar'>
      <h2>Search</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const cinemas = await getNearbyCinemas({
            q: `${location}, Paris, France`,
          })
          setCinemas(cinemas)
        }}
      >
        <h3>Find near…</h3>
        <label htmlFor='location'>Search by location</label>{' '}
        <input
          type='text'
          name='location'
          id='location'
          value={location}
          placeholder='filter by location'
          onChange={(e) => setLocation(e.target.value)}
        />
        <input type='submit' value='Search' />
        <input type='button' value='Find me' onClick={handleFindNearMe} />
      </form>
      <form>
        <h3>Quick filter</h3>
        <label htmlFor='name'>By name</label>{' '}
        <input
          type='text'
          id='name'
          name='name'
          value={query}
          placeholder="e.g. 'MK2', 'Bastille', etc"
          onChange={handleQueryChange}
        />
      </form>
    </div>
  )
}

export default SearchBar
