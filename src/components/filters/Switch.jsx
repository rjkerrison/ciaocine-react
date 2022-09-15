import Button from './FilterButton'
import Filter from './Filter'
import { getLabelValue } from './helpers'

const SwitchOption = ({
  option,
  name,
  className,
  updateFilter,
  values,
  defaultValue,
  getIsActive,
}) => {
  const { label, value } = getLabelValue(option)
  const isActive = getIsActive
    ? getIsActive(values, value)
    : value.toString() === (values[name] || defaultValue)

  return (
    <Button
      key={value}
      isActive={isActive}
      onClick={() => updateFilter(name, isActive ? false : value)}
      classes={[className]}
      label={label}
    />
  )
}

const Switch = ({ options, classes, ...props }) => {
  return (
    <Filter classes={classes}>
      {options.map((option) => (
        <SwitchOption
          key={getLabelValue(option).value}
          option={option}
          {...props}
        />
      ))}
    </Filter>
  )
}

export default Switch
