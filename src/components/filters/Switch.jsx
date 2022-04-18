const Switch = ({ options, className, values, name, updateFilter }) => {
  return (
    <ul className='movies-filters'>
      {options.map((option) => (
        <li
          key={option}
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
  )
}

export default Switch
