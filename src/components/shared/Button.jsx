const Button = ({
  isActive = false,
  classes = [],
  onClick,
  label,
  children,
  ...props
}) => {
  const className = [...classes, isActive ? 'active' : ''].join(' ')
  return (
    <button className={className} onClick={onClick} {...props}>
      {label}
      {children}
    </button>
  )
}

export default Button
