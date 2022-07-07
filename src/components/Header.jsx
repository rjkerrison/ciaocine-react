import React, { useState } from 'react'

import './Header.scss'

import Navbar from './layout/Navbar'

const Header = () => {
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
      <Navbar />
    </header>
  )
}

export default Header
