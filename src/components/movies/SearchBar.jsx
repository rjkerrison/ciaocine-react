import './SearchBar.scss'

const SearchBar = ({ query, setQuery }) => {
  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className='search-bar'>
      <h2>Recherche des films</h2>
      <form>
        <label htmlFor='name'>Titre</label>{' '}
        <input
          type='text'
          id='name'
          name='name'
          value={query}
          placeholder="e.g. 'Portrait de la jeune fille en feu', 'Vertigo', etc"
          onChange={handleQueryChange}
        />
      </form>
    </div>
  )
}

export default SearchBar
