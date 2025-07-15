import React, { useState, useEffect } from "react";

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
  showRupeeFormat = false,
}) => {
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${inputId}-error`;
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Format number to Indian currency format
  const formatToRupee = (num) => {
    if (!num || num === 0) return '';
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Remove formatting and return number
  const parseFromRupee = (str) => {
    if (!str) return '';
    return parseFloat(str.replace(/,/g, '')) || '';
  };

  useEffect(() => {
    if (showRupeeFormat && !isFocused && value) {
      setDisplayValue(formatToRupee(value));
    } else {
      setDisplayValue(value === 0 ? '' : value);
    }
  }, [value, isFocused, showRupeeFormat]);

  const handleFocus = () => {
    setIsFocused(true);
    if (showRupeeFormat) {
      setDisplayValue(value === 0 ? '' : value);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (showRupeeFormat && value) {
      setDisplayValue(formatToRupee(value));
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    if (showRupeeFormat) {
      const numericValue = parseFromRupee(inputValue);
      setDisplayValue(inputValue);
      onChange(numericValue);
    } else {
      const numericValue = inputValue === '' ? '' : Number(inputValue);
      setDisplayValue(inputValue);
      onChange(numericValue);
    }
  };

  return (
    <div className="input-group">
      <label htmlFor={inputId} className="input-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      <div className="input-wrapper">
        {showRupeeFormat && !isFocused && value && (
          <span className="currency-symbol">₹</span>
        )}
        <input
          id={inputId}
          type={showRupeeFormat && !isFocused ? "text" : type}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          required={required}
          disabled={disabled}
          className={`input-field ${error ? "input-error" : ""} ${showRupeeFormat ? "currency-input" : ""}`}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? "true" : "false"}
        />
      </div>
      {error && (
        <span id={errorId} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
