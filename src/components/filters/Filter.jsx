import './Filter.scss'

const Filter = ({ classes = [], children }) => {
  return (
    <div className={[...classes, 'movie-filter'].join(' ')}>{children}</div>
  )
}

export default Filter
