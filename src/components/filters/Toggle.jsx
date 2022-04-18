const Toggle = ({ label, className, values, updateFilter, name }) => {
  return (
    <>
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
}

export default Toggle
