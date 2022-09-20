import { formatAs } from '../../../utils/formatDate'
import SidebarTime from './SidebarTime'

const Hours = ({ startingHours, indexOffset }) => {
  return startingHours.map((hour) => (
    <SidebarTime
      key={hour}
      time={hour}
      gridRowStart={(formatAs.fifteenMinuteIndex(hour) - indexOffset + 96) % 96}
    />
  ))
}

export default Hours
