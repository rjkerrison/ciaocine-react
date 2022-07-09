import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import PopupLink from '../shared/PopupLink'
import { getCalendarRoute } from '../../utils/routeHelpers'
import NavigationSearchBar from './SearchBar'

const AccountNav = ({ logOutUser }) => (
  <>
    <nav aria-label='account navigation'>
      <Link to={getCalendarRoute()}>Calendar</Link>
      <button onClick={logOutUser}>Logout</button>
    </nav>
  </>
)

const AnonymousNav = () => {
  return (
    <nav aria-label='login or signup'>
      <PopupLink to='/auth/login'>Login</PopupLink>
      <Link to='/auth/signup'>Signup</Link>
    </nav>
  )
}

const Navbar = ({ toggleOpen, open }) => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext)

  return (
    <div
      className={'mobile-collapsible' + (open ? '' : ' collapsed')}
      onClick={toggleOpen}
      id='main-nav'
    >
      <nav aria-label='main navigation'>
        <Link to='/'>Home</Link>
        <Link to='/cinemas'>Cinemas</Link>
        <Link to='/showtimes'>Showtimes</Link>
        <NavigationSearchBar />
      </nav>
      <div className='account-header'>
        {isLoggedIn ? <AccountNav logOutUser={logOutUser} /> : <AnonymousNav />}
      </div>
    </div>
  )
}

export default Navbar
