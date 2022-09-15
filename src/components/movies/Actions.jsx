import './Actions.scss'
import ExternalLinks from './ExternalLinks'

const Actions = ({ children, movie }) => {
  return (
    <div className='actions'>
      <ExternalLinks {...movie} />
      {children}
    </div>
  )
}

export default Actions
