import { useId } from 'react'
import { CloseIcon, SearchIcon } from './Icons.jsx'

function SearchField({ value, onChange, onSubmit, label = 'البحث عن عصير', placeholder = 'البحث عن عصير...', ref, className = '' }) {
  const inputId = `search-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit?.(value)
  }

  return (
    <form role="search" className={`search-field ${className}`} onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor={inputId}>
        {label}
      </label>
      <SearchIcon />
      <input
        id={inputId}
        ref={ref}
        type="search"
        enterKeyHint="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      {value && (
        <button type="button" className="search-clear" onClick={() => onChange('')} aria-label="مسح البحث">
          <CloseIcon size={18} />
        </button>
      )}
    </form>
  )
}

export default SearchField
