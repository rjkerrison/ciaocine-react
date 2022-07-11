import { useMemo } from 'react'
import Input from './Input'

import './SearchForm.scss'

const SearchForm = ({
  handleSubmit,
  query,
  handleQueryChange,
  name,
  label,
  placeholder,
  children,
  submitValue = '🔍',
}) => {
  const id = useMemo(
    () => `${name}-${Math.floor(Math.random() * 10000)}`,
    [name]
  )

  const handleClick = (e) => {
    e.stopPropagation()
  }
  return (
    <form className='search-form' onSubmit={handleSubmit} onClick={handleClick}>
      <Input
        label={label}
        type='search'
        id={id}
        name={name}
        value={query}
        placeholder={placeholder}
        onInput={handleQueryChange}
      />
      <Input
        type='submit'
        value={submitValue}
        aria-label='Search'
        disabled={!query}
      />
      {children}
    </form>
  )
}

export default SearchForm
