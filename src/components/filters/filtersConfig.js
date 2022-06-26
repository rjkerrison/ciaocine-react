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
    return formatAs.dateMonth(params.searchDate || new Date())
  },
  getIsActive: (params, value) => {
    if (!params.searchDate) {
      return false
    }
    const daysAheadInt = parseInt(value) || 0
    const date = new Date(Date.now() + daysAheadInt * 86400 * 1000)
    return (
      params.searchDate.getDate() === date.getDate() &&
      params.searchDate.getMonth() === date.getMonth()
    )
  },
}

export const time = {
  name: ['fromHour', 'toHour'],
  label: 'Heure',
  component: Slider,
  options: getHoursOptions(),
  getShortDisplay: (params) => {
    const offset = Math.floor(date.getTimezoneOffset() / 60)
    if (params.fromHour) {
      if (params.toHour) {
        return `${parseInt(params.fromHour) - offset}h to ${
          parseInt(params.toHour) - offset
        }h`
      }
      return `After ${parseInt(params.fromHour) - offset}h`
    }
    if (params.toHour) {
      return `Before ${parseInt(params.toHour) - offset}h`
    }
    return `N'importe quelle heure`
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
