import { useState } from 'react'
import Input from '../shared/forms/Input'

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
      <div className='search-form'>
        <Input
          label='By name'
          id='name'
          name='name'
          value={query}
          placeholder="e.g. 'Batman'"
          onChange={handleQueryChange}
        />
        <Input type='submit' value={'🔍'} aria-label='Search' />
      </div>
    </form>
  )
}

export default QuickFilter
