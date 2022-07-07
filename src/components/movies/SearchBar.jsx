import './SearchBar.scss'

const SearchBar = ({ query, setQuery, updateMovies }) => {
  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateMovies()
  }

  return (
    <div className='search-bar'>
      <h2>Recherche des films</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Titre</label>
        <input
          type='search'
          id='name'
          name='name'
          value={query}
          placeholder="e.g. 'Portrait de la jeune fille en feu', 'Vertigo', etc"
          onChange={handleQueryChange}
        />
        <input type='submit' value='Search' />
      </form>
    </div>
  )
}

export default SearchBar
