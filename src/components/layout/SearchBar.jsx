import './SearchBar.scss'

const NavigationSearchBar = ({ query, setQuery, updateMovies }) => {
  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateMovies()
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
