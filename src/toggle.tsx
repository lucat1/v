import { h } from 'preact'

const ToggleSwitch = ({ name, checked, onChange }) => (
  <div>
    <label htmlFor={name}>{name}</label>
    <input
      style={{ display: 'none' }}
      type='checkbox'
      name={name}
      id={name}
      checked={checked}
      onChange={onChange}
    />
  </div>
)

export default ToggleSwitch
