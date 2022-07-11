import { useEffect } from 'react'
import { useState } from 'react'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import './SearchBar.scss'

const NavigationSearchBar = ({ toggleOpen }) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searchParams] = useSearchParams()

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const q = searchParams.get('q')
  useEffect(() => {
    if (q) {
      setQuery(q)
    }
  }, [q])

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate({
      pathname: '/search/movies',
      search: createSearchParams({ ...searchParams, q: query }).toString(),
    })
    toggleOpen?.()
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
        onInput={handleQueryChange}
      />
      <input
        type='submit'
        value='🔍'
        aria-label='Search'
        className='glass'
        disabled={!query}
      />
    </form>
  )
}

export default NavigationSearchBar
