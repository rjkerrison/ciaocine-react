import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { getCalendarRoute } from '../utils/routeHelpers'
import ProfilePicture from './ProfilePicture'

const AccountNav = ({ logOutUser }) => (
  <>
    <nav aria-label='account navigation'>
      <Link to={getCalendarRoute()}>Calendar</Link>
      <button onClick={logOutUser}>Logout</button>
    </nav>
    <ProfilePicture />
  </>
)

const AnonymousNav = () => {
  const location = useLocation()
  return (
    <nav aria-label='login or signup'>
      <Link to='/auth/login' state={{ backgroundLocation: location }}>
        Login
      </Link>
      <Link to='/auth/signup'>Signup</Link>
    </nav>
  )
}

const Header = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)

  return (
    <header className='app-header'>
      <div className='header-main-row' onClick={toggleOpen}>
        <p>Ciaocine</p>
        <span
          className={'collapse-toggle hamburger' + (open ? ' active' : '')}
          data-target='main-nav'
          role='switch'
          aria-checked={open}
        >
          <span className='hamburger-inner'></span>
        </span>
      </div>
      <div
        className={'mobile-collapsible' + (open ? '' : ' collapsed')}
        onClick={toggleOpen}
        id='main-nav'
      >
        <nav aria-label='main navigation'>
          <Link to='/'>Home</Link>
          <Link to='/cinemas'>Cinemas</Link>
          <Link to='/showtimes'>Showtimes</Link>
        </nav>
        <div className='account-header'>
          {isLoggedIn ? (
            <AccountNav logOutUser={logOutUser} />
          ) : (
            <AnonymousNav />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
