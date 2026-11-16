import { Link } from 'react-router'

/*
 * variant: primary (citrus orange, use sparingly) | secondary (deep green)
 *          | outline | ghost | danger
 * Pass `to` to render a router link styled as a button.
 */
function Button({ to, variant = 'primary', size = 'md', block = false, className = '', children, ...rest }) {
  const classes = ['btn', `btn-${variant}`, `btn-${size}`, block ? 'btn-block' : '', className].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
