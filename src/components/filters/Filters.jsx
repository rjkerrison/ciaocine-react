import { useCallback, useState } from 'react'
import { all, daysAhead, time } from './filtersConfig'
import './Filters.scss'

const Filters = ({ updateFilter, params, isCinema, children }) => {
  const [openFilters, setOpenFilters] = useState({})
  const filters = isCinema ? [daysAhead, time] : all

  const setOpenFilter = useCallback(
    (name, value) =>
      setOpenFilters((current) => ({
        ...current,
        [name]: value || !current[name],
      })),
    []
  )

  return (
    <nav className='filters'>
      {filters.map(({ component: Component, getShortDisplay, ...filter }) => (
        <div
          className={`interactive movies-filters-menu ${
            openFilters[filter.name] && 'selected'
          }`}
          key={filter.label}
        >
          <h3 onClick={() => setOpenFilter(filter.name)}>
            {getShortDisplay ? getShortDisplay(params) : filter.label}{' '}
            {openFilters[filter.name] ? '▲' : '▼'}
          </h3>
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
      {children}
    </nav>
  )
}

export default Filters
