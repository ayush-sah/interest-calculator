import { useState, useCallback } from "react";

/**
 * Custom hook for managing input state with validation
 * @param {any} initialValue - Initial value for the input
 * @param {Function} validator - Validation function that returns error message or empty string
 * @returns {Array} [value, handleChange, error, isValid]
 */
export const useValidatedInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);
      setTouched(true);

      if (validator) {
        const validationError = validator(newValue);
        setError(validationError);
      }
    },
    [validator]
  );

  const reset = useCallback(() => {
    setValue(initialValue);
    setError("");
    setTouched(false);
  }, [initialValue]);

  return [
    value,
    handleChange,
    touched ? error : "", // Only show error after user has interacted
    !error,
    reset,
  ];
};
