import React, { Fragment, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const Popup = ({ active = true, close }) => {
  const [classes, setClasses] = useState(['big-popup', 'movie-popup'])

  useEffect(() => {
    if (active) {
      const timeout = setTimeout(() => setClasses((c) => [...c, 'active']), 100)
      return () => clearTimeout(timeout)
    }
  }, [active])

  const deactivate = () => {
    setClasses((c) => c.filter((a) => a !== 'active'))
  }

  const handleTransitionEnd = () => {
    if (!classes.includes('active')) {
      close()
    }
  }

  if (!active) {
    return <></>
  }

  return (
    <article
      className={classes.join(' ')}
      onClick={deactivate}
      onTransitionEnd={handleTransitionEnd}
    >
      <Outlet />
      <button className='round' onClick={deactivate}>
        X
      </button>
    </article>
  )
}

export default Popup
