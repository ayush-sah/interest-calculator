import React from "react";

const InputField = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "number",
  min,
  max,
  step,
  required = false,
  disabled = false,
}) => {
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="input-group">
      <label htmlFor={inputId} className="input-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        required={required}
        disabled={disabled}
        className={`input-field ${error ? "input-error" : ""}`}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? "true" : "false"}
      />
      {error && (
        <span id={errorId} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
