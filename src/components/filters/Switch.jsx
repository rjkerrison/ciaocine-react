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
  console.log(label, value)

  return (
    <li
      key={value}
      className={[className, isActive ? 'selected' : ''].join(' ')}
    >
      <button
        className='movies-filter'
        onClick={() => updateFilter(name, isActive ? false : value)}
      >
        {label}
      </button>
    </li>
  )
}

const Switch = ({ options, ...props }) => {
  return (
    <ul className='movies-filters'>
      {options.map((option) => (
        <SwitchOption option={option} {...props} />
      ))}
    </ul>
  )
}

export default Switch