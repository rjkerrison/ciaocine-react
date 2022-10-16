import { useEffect } from 'react'
import { useState } from 'react'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import SearchForm from '../shared/forms/SearchForm'

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
      pathname: '/movies/search',
      search: createSearchParams({ ...searchParams, q: query }).toString(),
    })
    toggleOpen?.()
  }

  return (
    <SearchForm
      {...{ handleSubmit, handleQueryChange, query, name: 'search' }}
    />
  )
}

export default NavigationSearchBar
