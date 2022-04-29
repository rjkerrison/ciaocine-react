import { useCallback, useState } from 'react'
import { all, daysAhead, time } from './filtersConfig'
import './Filters.css'

const Filters = ({ updateFilter, params, isCinema }) => {
  const [openFilters, setOpenFilters] = useState({})
  const filters = isCinema ? [daysAhead, time] : all

  const setOpenFilter = useCallback(
    (name, value) =>
      setOpenFilters((current) => ({
        ...current,
        [name]: value,
      })),
    []
  )

  return (
    <nav className='filters'>
      {filters.map(({ component: Component, label, ...filter }) => (
        <div className='movies-filters-menu'>
          <h2 onClick={() => setOpenFilter(filter.name, true)}>{label}</h2>
          <Component
            {...filter}
            classes={[openFilters[filter.name] ? 'open' : 'closed']}
            key={filter.name}
            updateFilter={(...args) => {
              setOpenFilter(filter.name, false)
              updateFilter(...args)
            }}
            values={params}
          />
        </div>
      ))}
    </nav>
  )
}

export default Filters
