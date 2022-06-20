import { useState } from 'react'

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
    <form onSubmit={handleSubmit}>
      <h3>Quick filter</h3>
      <label htmlFor='name'>By name</label>{' '}
      <input
        type='text'
        id='name'
        name='name'
        value={query}
        placeholder="e.g. 'Batman'"
        onChange={handleQueryChange}
      />
      <input type='submit' value='Run' />
    </form>
  )
}

export default QuickFilter
