import { MinusIcon, PlusIcon } from './Icons.jsx'

function QuantityStepper({ value, onChange, min = 1, max = 20, itemName = '' }) {
  const suffix = itemName ? ` من ${itemName}` : ''
  return (
    <div className="stepper" role="group" aria-label={`الكمية${suffix}`}>
      <button
        type="button"
        className="stepper-btn"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`زيادة الكمية${suffix}`}
      >
        <PlusIcon />
      </button>
      <output className="stepper-value" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="stepper-btn"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`إنقاص الكمية${suffix}`}
      >
        <MinusIcon />
      </button>
    </div>
  )
}

export default QuantityStepper
