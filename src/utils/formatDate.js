const formatDate = (datetime, targetFormat) => {
  if (typeof datetime === 'string') {
    datetime = new Date(datetime)
  }

  try {
    let { format } = Intl.DateTimeFormat('fr-FR', targetFormat)
    return format(datetime, { timeZone: 'Europe/Paris' })
  } catch (error) {
    console.error('uhohohohoh', datetime, targetFormat)
    return datetime
  }
}

const timeFormat = {
  hour: 'numeric',
  minute: 'numeric',
}

const dateFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const dateMonthFormat = {
  month: 'long',
  day: 'numeric',
}

const weekdayDateFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}

const weekdayDateMonthFormat = {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}

const shortDateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}

const getFormatter = (format) => (date) => formatDate(date, format)

const time = getFormatter(timeFormat)
const date = getFormatter(dateFormat)
const dateMonth = getFormatter(dateMonthFormat)
const weekdayDate = getFormatter(weekdayDateFormat)
const fifteenMinuteIndex = (datetime) => {
  try {
    if (typeof datetime === 'string') {
      datetime = new Date(datetime)
    }
    return datetime.getHours() * 4 + Math.floor(datetime.getMinutes() / 15)
  } catch (error) {
    console.log('errored with datetime', datetime, error)
    return 1
  }
}
const yearMonthDate = (datetime) => {
  try {
    if (typeof datetime === 'string') {
      datetime = new Date(datetime)
    }
  } catch (error) {
    datetime = new Date()
  }
  return {
    year: datetime.getFullYear(),
    month: datetime.getMonth() + 1,
    date: datetime.getDate(),
  }
}

export const formatAs = {
  time,
  date,
  dateMonth,
  weekdayDate,
  fifteenMinuteIndex,
  yearMonthDate,
}

export const formats = {
  timeFormat,
  dateFormat,
  dateMonthFormat,
  shortDateFormat,
  weekdayDateFormat,
  weekdayDateMonthFormat,
}

export default formatDate
