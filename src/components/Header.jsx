import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import ProfilePicture from './ProfilePicture'

const AccountNav = () => (
  <>
    <nav aria-label='account navigation'>
      <Link to='/calendar'>Calendar</Link>
      <Link to='/auth/logout'>Logout</Link>
    </nav>
    <ProfilePicture />
  </>
)

const AnonymousNav = () => {
  return (
    <nav aria-label='login or signup'>
      <Link to='/auth/login'>Login</Link>
      <Link to='/auth/signup'>Signup</Link>
    </nav>
  )
}

const Header = ({ pageTitle }) => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <header className='app-header'>
      <div className='header-main-row'>
        <h1>Ciaocine: {pageTitle}</h1>
        <span
          className='collapse-toggle hamburger'
          data-target='main-nav'
          role='switch'
          aria-checked={false}
        >
          <span className='hamburger-inner'></span>
        </span>
      </div>
      <div className='mobile-collapsible collapsed' id='main-nav'>
        <nav aria-label='main navigation'>
          <Link to='/'>Home</Link>
          <Link to='/cinema'>Cinemas</Link>
          <Link to='/movies'>Movies</Link>
        </nav>
        <div className='account-header'>
          {isLoggedIn ? <AccountNav /> : <AnonymousNav />}
        </div>
      </div>
    </header>
  )
}

export default Header
