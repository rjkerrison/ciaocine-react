import { formatAs } from '../../../utils/formatDate'
import SidebarTime from './SidebarTime'

const Hours = ({ startingHours, indexOffset }) => {
  return startingHours.map((hour) => (
    <SidebarTime
      key={hour}
      time={hour}
      gridRowStart={(formatAs.fifteenMinuteIndex(hour) - indexOffset + 96) % 96}
      endSpan={4 - (formatAs.fifteenMinuteIndex(hour) % 4) || 4}
    />
  ))
}

export default Hours
