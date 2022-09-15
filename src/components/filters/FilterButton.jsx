import './FilterButton.scss'
import Button from '../shared/Button'

const FilterButton = ({ classes = [], ...props }) => {
  return <Button classes={[...classes, 'filter-button']} {...props} />
}

export default FilterButton
