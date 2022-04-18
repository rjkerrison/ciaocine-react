import filters from './filtersConfig'

const Filters = ({ updateFilter, params }) => {
  return (
    <>
      {filters.map(({ component: Component, ...filter }) => (
        <Component
          {...filter}
          key={filter.name}
          updateFilter={updateFilter}
          values={params}
        />
      ))}
    </>
  )
}

export default Filters
