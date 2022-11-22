import './Actions.scss'
import ExternalLinks from './ExternalLinks'

const Actions = ({ children, movie, classes = [] }) => {
  return (
    <div className={['actions', ...classes].join(' ')}>
      <ExternalLinks {...movie} />
      {children}
    </div>
  )
}

export default Actions
