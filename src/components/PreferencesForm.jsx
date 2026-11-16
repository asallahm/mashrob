import {
  ageGroupOptions,
  avoidOptions,
  defaultPreferences,
  flavorOptions,
  likeOptions,
  styleOptions,
} from '../data/preferences.js'
import { ChoiceGroup } from './FormField.jsx'

// Controlled form: `value` is a preferences object, `onChange` gets the next one.
function PreferencesForm({ value, onChange, idPrefix = 'prefs' }) {
  const set = (key) => (next) => onChange({ ...value, [key]: next })

  return (
    <div className="prefs-form">
      <ChoiceGroup
        legend="النكهات المفضّلة"
        name={`${idPrefix}-flavors`}
        options={flavorOptions}
        value={value.flavors}
        onChange={set('flavors')}
      />
      <ChoiceGroup
        legend="نوع المشروب"
        name={`${idPrefix}-styles`}
        options={styleOptions}
        value={value.styles}
        onChange={set('styles')}
      />
      <ChoiceGroup
        legend="مكونات مفضّلة"
        name={`${idPrefix}-likes`}
        options={likeOptions}
        value={value.likes}
        onChange={set('likes')}
      />
      <ChoiceGroup
        legend="مكونات يُفضَّل تجنّبها"
        hint="تُستبعد المشروبات التي تحتوي عليها من الاقتراحات."
        name={`${idPrefix}-avoid`}
        options={avoidOptions}
        value={value.avoid}
        onChange={set('avoid')}
      />

      <fieldset className="choice-group">
        <legend className="field-label">السكر</legend>
        <div className="chips">
          <label className={`chip chip-check ${value.lessSugar ? 'is-active' : ''}`}>
            <input
              type="checkbox"
              checked={value.lessSugar}
              onChange={(e) => onChange({ ...value, lessSugar: e.target.checked })}
            />
            بدون سكر مضاف فقط
          </label>
        </div>
      </fieldset>

      <ChoiceGroup
        legend="الفئة العمرية (اختياري)"
        hint="تُستخدم فقط لترتيب الاقتراحات حسب النكهة."
        name={`${idPrefix}-age`}
        options={ageGroupOptions}
        value={value.ageGroup}
        onChange={set('ageGroup')}
        multiple={false}
      />

      <div className="prefs-form-actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange(defaultPreferences)}>
          مسح كل الاختيارات
        </button>
      </div>
    </div>
  )
}

export default PreferencesForm
