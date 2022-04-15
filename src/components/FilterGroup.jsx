import React from 'react'

const FilterGroup = ({
  label,
  type,
  options,
  updateFilter,
  className,
  values,
  name,
}) => {
  switch (type) {
    case 'toggle':
      options = ['true', 'false']
      return (
        <>
          <p>{label}</p>
          <ul className='movies-filters'>
            <li
              className={[
                className,
                values[name] === 'true' ? 'selected' : '',
              ].join(' ')}
            >
              <button
                className='movies-filter'
                onClick={() => updateFilter(name, !(values[name] === 'true'))}
              >
                {label}
              </button>
            </li>
          </ul>
        </>
      )
    case 'switch':
      return (
        <>
          <p>{label}</p>
          <ul className='movies-filters'>
            {options.map((option) => (
              <li
                className={[
                  className,
                  option === values[name] ? 'selected' : '',
                ].join(' ')}
              >
                <button
                  className='movies-filter'
                  onClick={() =>
                    updateFilter(name, option === values[name] ? false : option)
                  }
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </>
      )
    default:
      return <p>Other</p>
  }
}

export default FilterGroup
