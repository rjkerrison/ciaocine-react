import { useState } from 'react'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import './SearchBar.scss'

const NavigationSearchBar = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate({
      pathname: '/search/movies',
      search: createSearchParams({ ...searchParams, q: query }).toString(),
    })
  }

  return (
    <form className='navigation-search-bar' onSubmit={handleSubmit}>
      <label htmlFor='name'>Titre</label>
      <input
        type='search'
        id='name'
        name='name'
        value={query}
        placeholder="e.g. 'Portrait de la jeune fille en feu', 'Vertigo', etc"
        onChange={handleQueryChange}
      />
      <input type='submit' value='🔍' aria-label='Search' className='glass' />
    </form>
  )
}

export default NavigationSearchBar
