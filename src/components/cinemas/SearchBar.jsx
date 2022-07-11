import { useContext, useState } from 'react'
import { getNearbyCinemas } from '../../api/cinemas'
import { ToastContext } from '../../context/ToastContext'
import Input from '../shared/forms/Input'
import SearchForm from '../shared/forms/SearchForm'

import './SearchBar.scss'

const SearchBar = ({ query, setQuery, setCinemas }) => {
  const { toast } = useContext(ToastContext)
  const [location, setLocation] = useState('')

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

      <h3>Find near…</h3>
      <SearchForm
        handleSubmit={async (e) => {
          e.preventDefault()
          const cinemas = await getNearbyCinemas({
            q: `${location}, Paris, France`,
          })
          setCinemas(cinemas)
        }}
        name='location'
        label='Search by location'
        query={location}
        handleQueryChange={(e) => setLocation(e.target.value)}
        placeholder='filter by location'
      >
        <Input type='button' value='Find me' onClick={handleFindNearMe} />
      </SearchForm>

      <h3>Quick filter</h3>
      <Input
        placeholder="e.g. 'MK2', 'Grand', etc"
        label='By name'
        {...{ handleQueryChange, query, name: 'cinemaName' }}
      />
    </div>
  )
}

export default SearchBar
