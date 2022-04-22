import { URL_SEPARATOR } from '../../utils/consts'
import Button from '../shared/Button'
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
    <Button
      key={value}
      isActive={isActive(value)}
      onClick={() => updateFilter(name, toggle(value))}
      classes={[className]}
      label={label}
    />
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
    <div className='movies-filters'>
      {groupedOptions.map((group, i) => {
        if (!group) {
          console.error(`group at index ${i} was not defined`)
          return <></>
        }

        return (
          <Button
            key={group.label}
            isActive={isGroupActive(group)}
            onClick={() => updateFilter(name, toggleGroup(group))}
            classes={[className]}
            label={group.label}
          />
        )
      })}
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
    </div>
  )
}

export default Multi
