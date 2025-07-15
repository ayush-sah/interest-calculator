import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing input state with validation
 * @param {any} initialValue - Initial value for the input
 * @param {Function} validator - Validation function that returns error message or empty string
 * @param {Array} dependencies - Dependencies that should trigger re-validation
 * @returns {Array} [value, handleChange, error, isValid, reset]
 */
export const useValidatedInput = (initialValue, validator, dependencies = []) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
    setTouched(true);
    
    if (validator) {
      const validationError = validator(newValue);
      setError(validationError);
    }
  }, [validator]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError('');
    setTouched(false);
  }, [initialValue]);

  // Re-validate when dependencies change
  useEffect(() => {
    if (touched && validator && value !== '') {
      const validationError = validator(value);
      setError(validationError);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return [
    value, 
    handleChange, 
    touched ? error : '', // Only show error after user has interacted
    !error && value !== '',
    reset
  ];
};
