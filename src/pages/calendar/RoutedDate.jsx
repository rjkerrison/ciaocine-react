import { useParams } from 'react-router-dom'
import SingleDay from './SingleDay'

const CalendarRoutedDate = () => {
  return <SingleDay {...useParams()} />
}

export default CalendarRoutedDate
