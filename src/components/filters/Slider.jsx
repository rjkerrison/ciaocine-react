const Slider = ({ options, className, values, name, updateFilter }) => {
  const [lower, upper] = name.map((n) => Number(values[n]))

  const updateSlider = (option) => {
    if (!lower) {
      updateFilter(name[0], option)
      return
    }
    if (lower === option) {
      updateFilter(name[0], null)
      return
    }
    if (upper === option) {
      updateFilter(name[1], null)
      return
    }
    updateFilter(option < lower ? name[0] : name[1], option)
  }

  return (
    <ul className='movies-filters'>
      {options.map((option) => (
        <li
          key={option}
          className={[
            className,
            option === lower || option === upper ? 'selected' : '',
            (!lower || option > lower) && (!upper || option < upper)
              ? 'selected'
              : '',
          ].join(' ')}
        >
          <button
            className='movies-filter'
            onClick={() => updateSlider(option)}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Slider
