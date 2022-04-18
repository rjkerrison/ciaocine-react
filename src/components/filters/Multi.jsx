const Multi = ({
  options,
  className,
  values,
  name,
  updateFilter,
  groupedOptions,
}) => {
  const current = (values[name] || '').split(',')

  const isActive = (option) => current.indexOf(option.toString()) !== -1
  const toggle = (option) =>
    isActive(option)
      ? current.filter((x) => x !== option.toString()).join(',')
      : [...current, option].join(',')

  const isGroupActive = (group) =>
    group.options.every((option) => isActive(option))

  const toggleGroup = (group) =>
    isGroupActive(group)
      ? current.filter((x) => !group.options.includes(x)).join(',')
      : Array.from(new Set([...current, ...group.options])).join(',')

  return (
    <ul className='movies-filters'>
      {options.map((option) => (
        <li
          key={option}
          className={[className, isActive(option) ? 'selected' : ''].join(' ')}
        >
          <button
            className='movies-filter'
            onClick={() => updateFilter(name, toggle(option))}
          >
            {option}
          </button>
        </li>
      ))}
      {groupedOptions.map((group) => {
        return (
          <li
            key={group.label}
            className={[className, isGroupActive(group) ? 'selected' : ''].join(
              ' '
            )}
          >
            <button
              className='movies-filter'
              onClick={() => updateFilter(name, toggleGroup(group))}
            >
              {group.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Multi
