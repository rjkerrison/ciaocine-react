import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import PopupLink from '../shared/PopupLink'
import { getCalendarRoute } from '../../utils/routeHelpers'
import NavigationSearchBar from './NavigationSearchBar'
import Button from '../shared/Button'

const AccountNav = ({ logOutUser }) => (
  <>
    <nav aria-label='account navigation'>
      <Link to={getCalendarRoute()}>Calendar</Link>
      <Button onClick={logOutUser}>Logout</Button>
    </nav>
  </>
)

const AnonymousNav = () => {
  return (
    <nav aria-label='login or signup'>
      <PopupLink to='/auth/login'>Login</PopupLink>
      <PopupLink to='/auth/signup'>Signup</PopupLink>
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
      </nav>
      <nav className='additional' aria-label='additional navigation'>
        <NavigationSearchBar {...{ toggleOpen }} />
        <div className='account-header'>
          {isLoggedIn ? (
            <AccountNav logOutUser={logOutUser} />
          ) : (
            <AnonymousNav />
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
