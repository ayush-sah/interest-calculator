/**
 * Calculate simple interest
 * Formula: A = P(1 + rt)
 * @param {number} principal - The principal amount
 * @param {number} monthlyRate - Monthly interest rate as percentage
 * @param {number} months - Time period in months
 * @returns {number} Final amount after simple interest
 */
export const calculateSimpleInterest = (principal, monthlyRate, months) => {
  if (principal <= 0 || monthlyRate < 0 || months <= 0) {
    throw new Error("Invalid input values for simple interest calculation");
  }

  const rate = monthlyRate / 100;
  return principal * (1 + rate * months);
};

/**
 * Calculate compound interest
 * Formula: A = P(1 + r/n)^(nt)
 * @param {number} principal - The principal amount
 * @param {number} monthlyRate - Monthly interest rate as percentage
 * @param {number} months - Time period in months
 * @param {string} frequency - Compounding frequency ('monthly' or 'yearly')
 * @returns {number} Final amount after compound interest
 */
export const calculateCompoundInterest = (
  principal,
  monthlyRate,
  months,
  frequency
) => {
  if (principal <= 0 || monthlyRate < 0 || months <= 0) {
    throw new Error("Invalid input values for compound interest calculation");
  }

  // Convert monthly rate to annual rate
  const annualRate = (monthlyRate / 100) * 12;

  // Determine compounding frequency
  const compoundingFrequency = frequency === "monthly" ? 12 : 1;

  // Convert months to years
  const years = months / 12;

  // Apply compound interest formula
  return (
    principal *
    Math.pow(
      1 + annualRate / compoundingFrequency,
      compoundingFrequency * years
    )
  );
};

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale for formatting (default: 'en-IN')
 * @param {string} currency - Currency code (default: 'INR')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, locale = "en-IN", currency = "INR") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Validate input values
 * @param {number} amount - Principal amount
 * @param {number} rate - Interest rate
 * @param {number} period - Time period
 * @returns {Object} Validation result with isValid flag and errors array
 */
export const validateInputs = (amount, rate, period) => {
  const errors = [];

  if (!amount || amount <= 0) {
    errors.push("Amount must be greater than 0");
  }

  if (amount > 10000000) {
    errors.push("Amount cannot exceed 10,000,000");
  }

  if (rate < 0) {
    errors.push("Interest rate cannot be negative");
  }

  if (rate > 100) {
    errors.push("Interest rate cannot exceed 100%");
  }

  if (!period || period <= 0) {
    errors.push("Period must be greater than 0");
  }

  if (period > 1200) {
    errors.push("Period cannot exceed 1200 months");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
