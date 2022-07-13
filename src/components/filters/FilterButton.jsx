import './FilterButton.scss'
import Button from '../shared/Button'

const FilterButton = ({ classes = [], ...props }) => {
  return (
    <Button
      classes={[...classes, 'ciaocine-input', 'filter-button']}
      {...props}
    />
  )
}

export default FilterButton
