import Button from './FilterButton'
import Filter from './Filter'

const Toggle = ({ label, classes, values, updateFilter, name }) => {
  const isActive = values[name] === 'true'

  return (
    <Filter classes={classes}>
      <Button
        isActive={isActive}
        onClick={() => updateFilter(name, !isActive)}
        label={label}
      />
    </Filter>
  )
}

export default Toggle
