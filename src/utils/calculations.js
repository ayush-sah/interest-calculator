/**
 * Calculate simple interest
 * Formula: A = P(1 + rt)
 * @param {number} principal - Principal amount
 * @param {number} monthlyRate - Monthly interest rate (as percentage)
 * @param {number} timeInMonths - Time period in months
 * @returns {number} Final amount
 */
export const calculateSimpleInterest = (
  principal,
  monthlyRate,
  timeInMonths
) => {
  if (principal <= 0 || monthlyRate < 0 || timeInMonths <= 0) {
    throw new Error("Invalid input values for simple interest calculation");
  }

  const rate = monthlyRate / 100; // Convert percentage to decimal
  return principal * (1 + rate * timeInMonths);
};

/**
 * Calculate compound interest
 * Formula: A = P(1 + r/n)^(nt)
 * @param {number} principal - Principal amount
 * @param {number} monthlyRate - Monthly interest rate (as percentage)
 * @param {number} timeInMonths - Time period in months
 * @param {string} frequency - Compounding frequency ('monthly' or 'yearly')
 * @returns {number} Final amount
 */
export const calculateCompoundInterest = (
  principal,
  monthlyRate,
  timeInMonths,
  frequency
) => {
  if (principal <= 0 || monthlyRate < 0 || timeInMonths <= 0) {
    throw new Error("Invalid input values for compound interest calculation");
  }

  const monthlyRateDecimal = monthlyRate / 100;
  const annualRate = monthlyRateDecimal * 12; // Convert monthly rate to annual
  const timeInYears = timeInMonths / 12;

  let n; // Compounding frequency per year
  if (frequency === "monthly") {
    n = 12;
  } else if (frequency === "yearly") {
    n = 1;
  } else {
    throw new Error("Invalid compounding frequency");
  }

  return principal * Math.pow(1 + annualRate / n, n * timeInYears);
};

/**
 * Format currency in Indian Rupee format
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Validate input values
 * @param {number} amount - Principal amount
 * @param {number} rate - Interest rate
 * @param {number} period - Time period
 * @returns {object} Validation result
 */
export const validateInputs = (amount, rate, period) => {
  const errors = [];

  if (!amount || amount <= 0) {
    errors.push("Amount must be greater than 0");
  }

  if (amount > 10000000) {
    errors.push("Amount cannot exceed ₹10,000,000");
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
