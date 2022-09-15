const Button = ({
  isActive = false,
  classes = [],
  onClick,
  label,
  children,
}) => {
  const className = [...classes, isActive ? 'selected' : ''].join(' ')
  return (
    <button className={className} onClick={onClick}>
      {label}
      {children}
    </button>
  )
}

export default Button
