import { Link, useLocation } from 'react-router-dom'

const NotFound = () => {
  const location = useLocation()
  console.log(location.history)

  return (
    <div
      style={{
        '--backdrop-path': `url(https://i.imgur.com/ZEo1x2U.jpeg)`,
        minHeight: '100vh',
      }}
      className='movie-popup-inner popup-inner'
    >
      <h1>Erased from existence</h1>
      <p>These are not the droids you're looking for.</p>
      <p>
        Go <Link to={-1}>back to the future</Link>.
      </p>
    </div>
  )
}

export default NotFound
