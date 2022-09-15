import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Button from './shared/Button'

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
      <Button classes={['round']} onClick={deactivate}>
        X
      </Button>
    </article>
  )
}

export default Popup
