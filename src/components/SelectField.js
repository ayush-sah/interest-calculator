import React from "react";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
}) => {
  const selectId = `select-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="input-group">
      <label htmlFor={selectId} className="input-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className="select-field"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
