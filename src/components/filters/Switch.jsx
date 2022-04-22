import Button from '../shared/Button'
import { getLabelValue } from './helpers'

const SwitchOption = ({
  option,
  name,
  className,
  updateFilter,
  values,
  defaultValue,
}) => {
  const { label, value } = getLabelValue(option)
  const isActive = value.toString() === (values[name] || defaultValue)

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

const Switch = ({ options, ...props }) => {
  return (
    <div className='movies-filters'>
      {options.map((option) => (
        <SwitchOption
          key={getLabelValue(option).value}
          option={option}
          {...props}
        />
      ))}
    </div>
  )
}

export default Switch
