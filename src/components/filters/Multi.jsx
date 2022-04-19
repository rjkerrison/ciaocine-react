import { URL_SEPARATOR } from '../../utils/consts'
import { getLabelValue } from './helpers'

const MultiSingleOption = ({
  option,
  className,
  name,
  updateFilter,
  isActive,
  toggle,
}) => {
  const { label, value } = getLabelValue(option)

  return (
    <li
      key={value}
      className={[className, isActive(value) ? 'selected' : ''].join(' ')}
    >
      <button
        className='movies-filter'
        onClick={() => updateFilter(name, toggle(value))}
      >
        {label}
      </button>
    </li>
  )
}

const Multi = ({
  options,
  className,
  values,
  name,
  updateFilter,
  groupedOptions,
}) => {
  const current = (values[name] || '').split(URL_SEPARATOR).filter((x) => x)
  const isActive = (value) => current.indexOf(value) !== -1

  const toggle = (value) =>
    isActive(value)
      ? current.filter((x) => x !== value).join(URL_SEPARATOR)
      : [...current, value].join(URL_SEPARATOR)

  const isGroupActive = (group) =>
    group.options.every((option) => isActive(option))

  const toggleGroup = (group) =>
    isGroupActive(group)
      ? current.filter((x) => !group.options.includes(x)).join(URL_SEPARATOR)
      : Array.from(new Set([...current, ...group.options])).join(URL_SEPARATOR)

  return (
    <ul className='movies-filters'>
      {options.map((option) => (
        <MultiSingleOption
          key={getLabelValue(option).value}
          option={option}
          className={className}
          name={name}
          updateFilter={updateFilter}
          isActive={isActive}
          toggle={toggle}
        />
      ))}
      {groupedOptions.map((group, i) => {
        if (!group) {
          console.error(`group at index ${i} was not defined`)
          return <></>
        }

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
