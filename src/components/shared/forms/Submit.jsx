import React from 'react'

const Input = ({ label, type = 'search', className, ...inputProps }) => {
  const classes = [className, 'ciaocine-input']
  return (
    <>
      {label && <label htmlFor={inputProps.id}>{label}</label>}
      <input className={classes.join(' ')} type={type} {...inputProps} />
    </>
  )
}

export default Input
