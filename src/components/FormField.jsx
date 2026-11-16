// Labelled form controls with hint + inline error, wired for screen readers.

function Field({ id, label, required, hint, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="field-required"> (مطلوب)</span> : <span className="field-optional"> (اختياري)</span>}
      </label>
      {hint && (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(id, hint, error) {
  return [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined
}

export function TextField({ id, label, required, hint, error, ltr = false, ...inputProps }) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        className={`input ${ltr ? 'input-ltr' : ''}`}
        dir={ltr ? 'ltr' : undefined}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...inputProps}
      />
    </Field>
  )
}

export function TextAreaField({ id, label, required, hint, error, rows = 3, ...props }) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        className="input textarea"
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...props}
      />
    </Field>
  )
}

export function SelectField({ id, label, required, hint, error, options, placeholder, ...props }) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        className="input select"
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

// Group of chip-style checkboxes (multiple) or radios (single).
export function ChoiceGroup({ legend, hint, name, options, value, onChange, multiple = true, error }) {
  const selected = multiple ? value : [value]

  function toggle(id) {
    if (!multiple) return onChange(id)
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id])
  }

  return (
    <fieldset className={`choice-group ${error ? 'has-error' : ''}`}>
      <legend className="field-label">{legend}</legend>
      {hint && <p className="field-hint">{hint}</p>}
      <div className="chips">
        {options.map((o) => {
          const checked = selected.includes(o.id)
          return (
            <label key={o.id || 'none'} className={`chip chip-check ${checked ? 'is-active' : ''}`}>
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                value={o.id}
                checked={checked}
                onChange={() => toggle(o.id)}
              />
              {o.label}
            </label>
          )
        })}
      </div>
      {error && <p className="field-error">{error}</p>}
    </fieldset>
  )
}
