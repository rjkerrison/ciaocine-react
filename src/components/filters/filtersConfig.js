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

const date = new Date()
const offset = Math.floor(date.getTimezoneOffset() / 60)
const getHoursOptions = () => {
  return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(
    (hour) => {
      return {
        value: hour + offset,
        label: hour + 'h',
      }
    }
  )
}

export const daysAhead = {
  name: 'daysAhead',
  component: Switch,
  options: daysAheadOptions(),
  label: 'Date',
  defaultValue: '0',
  getShortDisplay: (params) => {
    if (params.daysAhead) {
      const date = new Date(Date.now() + params.daysAhead * 86400 * 1000)
      return formatAs.dateMonth(date)
    }
    return `Date`
  },
}

export const time = {
  name: ['fromHour', 'toHour'],
  label: 'Heure',
  component: Slider,
  options: getHoursOptions(),
  getShortDisplay: (params) => {
    if (params.fromHour) {
      if (params.toHour) {
        return `${params.fromHour}h to ${params.toHour}h`
      }
      return `After ${params.fromHour}h`
    }
    if (params.toHour) {
      return `Before ${params.toHour}h`
    }
    return `N'importe pas l'heure`
  },
}

const ugcFilter = {
  name: 'ugcIllimiteOnly',
  component: Toggle,
  label: 'UGC Illimité',
  getShortDisplay: (params) => {
    if (params['ugcIllimiteOnly'] === 'true') {
      return 'Accepting UGC Illimité'
    }
    return 'Any cinema'
  },
}

export const all = [daysAhead, time, arrondissementFilter, ugcFilter]
