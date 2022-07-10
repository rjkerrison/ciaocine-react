import { useState } from 'react'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import './SearchBar.scss'

const NavigationSearchBar = ({ toggleOpen }) => {
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
    toggleOpen()
  }

  const handleClick = (e) => {
    e.stopPropagation()
  }

  return (
    <form
      className='navigation-search-bar'
      onSubmit={handleSubmit}
      onClick={handleClick}
    >
      <label htmlFor='name'>Titre</label>
      <input
        type='search'
        id='name'
        name='name'
        value={query}
        placeholder='Search by movie'
        onChange={handleQueryChange}
      />
      <input type='submit' value='🔍' aria-label='Search' className='glass' />
    </form>
  )
}

export default NavigationSearchBar
