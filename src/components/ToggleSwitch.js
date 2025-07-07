import React from 'react';

const ToggleSwitch = ({ 
  label, 
  leftOption, 
  rightOption, 
  value, 
  onChange, 
  disabled = false 
}) => {
  const toggleId = `toggle-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="toggle-group">
      <label className="toggle-label">{label}</label>
      <div className="toggle-switch-container">
        <span className={`toggle-option ${value === leftOption.value ? 'active' : ''}`}>
          {leftOption.label}
        </span>
        <button
          type="button"
          id={toggleId}
          className={`toggle-switch ${value === rightOption.value ? 'toggled' : ''}`}
          onClick={() => onChange(value === leftOption.value ? rightOption.value : leftOption.value)}
          disabled={disabled}
          aria-label={`Switch between ${leftOption.label} and ${rightOption.label}`}
          aria-pressed={value === rightOption.value}
        >
          <span className="toggle-slider" />
        </button>
        <span className={`toggle-option ${value === rightOption.value ? 'active' : ''}`}>
          {rightOption.label}
        </span>
      </div>
    </div>
  );
};

export default ToggleSwitch;