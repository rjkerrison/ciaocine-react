import { all, daysAhead, time } from './filtersConfig'

const Filters = ({ updateFilter, params, isCinema }) => {
  const filters = isCinema ? [daysAhead, time] : all

  return (
    <nav className='filters'>
      {filters.map(({ component: Component, ...filter }) => (
        <div className='movies-filters-menu'>
          <Component
            {...filter}
            key={filter.name}
            updateFilter={updateFilter}
            values={params}
          />
        </div>
      ))}
    </nav>
  )
}

export default Filters
