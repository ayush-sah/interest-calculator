import React from "react";

const InputField = ({
  label,
  type = "number",
  value,
  onChange,
  error,
  placeholder,
  min,
  max,
  step = "any",
  required = false,
}) => {
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="input-group">
      <label htmlFor={inputId} className="input-label">
        {label}
        {required && (
          <span className="required-indicator" aria-label="required">
            *
          </span>
        )}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) =>
          onChange(type === "number" ? Number(e.target.value) : e.target.value)
        }
        className={`input-field ${error ? "input-error" : ""}`}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        required={required}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? "true" : "false"}
      />
      {error && (
        <span
          id={errorId}
          className="error-message"
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
