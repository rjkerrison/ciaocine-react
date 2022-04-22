import Button from '../shared/Button'

const Toggle = ({ label, className, values, updateFilter, name }) => {
  const isActive = values[name] === 'true'

  return (
    <div className='movies-filters'>
      <Button
        isActive={isActive}
        onClick={() => updateFilter(name, !isActive)}
        classes={[className]}
        label={label}
      />
    </div>
  )
}

export default Toggle
