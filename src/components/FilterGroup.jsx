import Multi from './filters/Multi'
import Switch from './filters/Switch'
import Toggle from './filters/Toggle'

const FilterGroup = ({ type, component: Component, ...filter }) => {
  switch (type) {
    case 'toggle':
      return <Toggle {...filter} />
    case 'switch':
      return <Switch {...filter} />
    // case 'multi':
    //   return <Multi {...filter} />
    default:
      return <Component {...filter} />
  }
}

export default FilterGroup
