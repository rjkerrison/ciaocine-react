import React from 'react'

import './Input.scss'

const Input = ({ label, type = 'search', className, ...inputProps }) => {
  const classes = [className, 'ciaocine-input']
  return (
    <>
      {label && (
        <label className='off-screen' htmlFor={inputProps.id}>
          {label}
        </label>
      )}
      <input className={classes.join(' ')} type={type} {...inputProps} />
    </>
  )
}

export default Input
