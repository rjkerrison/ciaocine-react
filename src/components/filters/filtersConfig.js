import { formatAs } from '../../utils/formatDate'
import arrondissementFilter from './arrondissements'
import Slider from './Slider'
import Switch from './Switch'
import Toggle from './Toggle'

const daysAheadOptions = () => {
  return [0, 1, 2, 3, 4, 5, 6].map((daysAhead) => {
    const date = new Date(Date.now() + daysAhead * 86400 * 1000)
    return {
      value: daysAhead,
      label: formatAs.dateMonth(date),
    }
  })
}

const getHoursOptions = () => {
  return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(
    (hour) => {
      return {
        value: hour,
        label: hour + 'h',
      }
    }
  )
}

const filters = [
  {
    name: 'daysAhead',
    component: Switch,
    options: daysAheadOptions(),
    label: 'Date',
    defaultValue: '0',
  },
  { name: 'ugcIllimiteOnly', component: Toggle, label: 'UGC Illimité' },
  {
    name: ['fromHour', 'toHour'],
    component: Slider,
    options: getHoursOptions(),
  },
  arrondissementFilter,
]

export default filters
