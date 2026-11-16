import { AlertIcon, InfoIcon } from './Icons.jsx'

// Small inline note. tone: info | warning | demo
function Notice({ tone = 'info', title, children, className = '' }) {
  return (
    <div className={`notice notice-${tone} ${className}`}>
      {tone === 'warning' ? <AlertIcon /> : <InfoIcon />}
      <div>
        {title && <p className="notice-title">{title}</p>}
        <div className="notice-body">{children}</div>
      </div>
    </div>
  )
}

export default Notice
