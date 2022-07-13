import { useState } from 'react'
import SearchForm from '../shared/forms/SearchForm'

const QuickFilter = ({ setCurrentQuery }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setCurrentQuery(query)
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }
  return (
    <>
      <h3>Quick filter</h3>
      <SearchForm
        label='By name'
        type='text'
        id='name'
        name='name'
        value={query}
        placeholder='filter by name'
        handleSubmit={handleSubmit}
        handleQueryChange={handleQueryChange}
      />
    </>
  )
}

export default QuickFilter
