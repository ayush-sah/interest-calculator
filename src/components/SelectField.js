import React from "react";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  required = false,
}) => {
  const selectId = `select-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="input-group">
      <label htmlFor={selectId} className="input-label">
        {label}
        {required && (
          <span className="required-indicator" aria-label="required">
            *
          </span>
        )}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select-field"
        disabled={disabled}
        required={required}
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
