import { formatAs } from '../../utils/formatDate'
import Multi from './Multi'
import Slider from './Slider'
import Switch from './Switch'
import Toggle from './Toggle'

const riveDroiteArrondissements = [
  '75001',
  '75002',
  '75003',
  '75004',
  '75009',
  '75010',
  '75011',
  '75012',
  '75016',
  '75017',
  '75018',
  '75019',
  '75020',
]

const riveGaucheArrondissements = [
  '75005',
  '75006',
  '75007',
  '75013',
  '75014',
  '75015',
]

const allArrondissements = [
  ...riveDroiteArrondissements,
  ...riveGaucheArrondissements,
]
allArrondissements.sort()

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
  {
    name: 'arrondissements',
    component: Multi,
    groupedOptions: [
      {
        label: 'Rive Gauche',
        options: riveGaucheArrondissements,
      },
      {
        label: 'Rive Droite',
        options: riveDroiteArrondissements,
      },
    ],
    options: allArrondissements,
  },
]

export default filters
