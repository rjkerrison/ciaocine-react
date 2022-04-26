import { all, daysAhead, time } from './filtersConfig'

const Filters = ({ updateFilter, params, isCinema }) => {
  const filters = isCinema ? [daysAhead, time] : all

  return (
    <>
      {filters.map(({ component: Component, ...filter }) => (
        <Component
          {...filter}
          key={filter.label}
          updateFilter={updateFilter}
          values={params}
        />
      ))}
    </>
  )
}

export default Filters
