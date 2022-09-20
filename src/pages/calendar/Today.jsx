import { formatAs } from '../../utils/formatDate'
import SingleDay from './SingleDay'

const Today = () => {
  return <SingleDay {...formatAs.yearMonthDate()} />
}

export default Today
