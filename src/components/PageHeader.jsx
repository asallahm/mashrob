import { Link } from 'react-router'

// Page title block with optional breadcrumb trail [{ to, label }].
function PageHeader({ title, intro, crumbs, children }) {
  return (
    <div className="page-header">
      {crumbs && (
        <nav aria-label="مسار التنقل" className="breadcrumbs">
          <ol>
            <li>
              <Link to="/">الرئيسية</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
      )}
      {title && <h1>{title}</h1>}
      {intro && <p className="page-intro">{intro}</p>}
      {children}
    </div>
  )
}

export default PageHeader
