import React, { useState, useCallback } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import ResultDisplay from "./components/ResultDisplay";
import { useValidatedInput } from "./hooks/useValidatedInput";
import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  validateInputs,
} from "./utils/calculations";
import "./App.css";

// Validation functions
const validators = {
  amount: (value) => {
    if (!value || value <= 0) return "Amount must be greater than 0";
    if (value > 10000000) return "Amount cannot exceed ₹10,000,000";
    return "";
  },
  rate: (value) => {
    if (value < 0) return "Interest rate cannot be negative";
    if (value > 100) return "Interest rate cannot exceed 100%";
    return "";
  },
  period: (value) => {
    if (!value || value <= 0) return "Period must be greater than 0";
    if (value > 1200) return "Period cannot exceed 1200 months (100 years)";
    return "";
  },
};

export default function InterestCalculator() {
  const [amount, setAmount, amountError, isAmountValid, resetAmount] =
    useValidatedInput(0, validators.amount);
  const [monthlyRate, setMonthlyRate, rateError, isRateValid, resetRate] =
    useValidatedInput(0, validators.rate);
  const [period, setPeriod, periodError, isPeriodValid, resetPeriod] =
    useValidatedInput(0, validators.period);
  const [interestType, setInterestType] = useState("simple");
  const [compoundFreq, setCompoundFreq] = useState("monthly");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState("");

  const hasErrors = amountError || rateError || periodError;
  const hasEmptyFields = !amount || !monthlyRate || !period;
  const canCalculate =
    !hasErrors &&
    !hasEmptyFields &&
    isAmountValid &&
    isRateValid &&
    isPeriodValid;

  const calculateInterest = useCallback(async () => {
    if (!canCalculate) return;

    setIsCalculating(true);
    setCalculationError("");

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const validation = validateInputs(amount, monthlyRate, period);

      if (!validation.isValid) {
        setCalculationError(validation.errors.join(", "));
        return;
      }

      let finalAmount;

      if (interestType === "simple") {
        finalAmount = calculateSimpleInterest(amount, monthlyRate, period);
      } else {
        finalAmount = calculateCompoundInterest(
          amount,
          monthlyRate,
          period,
          compoundFreq
        );
      }

      // Round to 2 decimal places
      setResult(Math.round(finalAmount * 100) / 100);
    } catch (error) {
      console.error("Calculation error:", error);
      setCalculationError(
        "An error occurred during calculation. Please check your inputs."
      );
    } finally {
      setIsCalculating(false);
    }
  }, [amount, monthlyRate, period, interestType, compoundFreq, canCalculate]);

  const resetCalculator = useCallback(() => {
    resetAmount();
    resetRate();
    resetPeriod();
    setInterestType("simple");
    setCompoundFreq("monthly");
    setResult(null);
    setCalculationError("");
  }, [resetAmount, resetRate, resetPeriod]);

  const interestTypeOptions = [
    { value: "simple", label: "Simple Interest" },
    { value: "compound", label: "Compound Interest" },
  ];

  const compoundFreqOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  return (
    <div className="calculator-container">
      <header className="calculator-header">
        <h1>Interest Calculator</h1>
        <p>Calculate simple and compound interest with precision and ease</p>
      </header>

      <main className="calculator-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateInterest();
          }}
        >
          <InputField
            label="Principal Amount"
            value={amount}
            onChange={setAmount}
            error={amountError}
            placeholder="Enter amount in ₹"
            min="0"
            max="10000000"
            required
          />

          <InputField
            label="Monthly Interest Rate"
            value={monthlyRate}
            onChange={setMonthlyRate}
            error={rateError}
            placeholder="Enter monthly rate (%)"
            min="0"
            max="100"
            step="0.01"
            required
          />

          <InputField
            label="Time Period"
            value={period}
            onChange={setPeriod}
            error={periodError}
            placeholder="Enter period in months"
            min="0"
            max="1200"
            required
          />

          <SelectField
            label="Interest Type"
            value={interestType}
            onChange={setInterestType}
            options={interestTypeOptions}
            required
          />

          {interestType === "compound" && (
            <SelectField
              label="Compounding Frequency"
              value={compoundFreq}
              onChange={setCompoundFreq}
              options={compoundFreqOptions}
              required
            />
          )}

          {calculationError && (
            <div className="calculation-error" role="alert">
              {calculationError}
            </div>
          )}

          <div className="button-group">
            <button
              type="submit"
              disabled={!canCalculate || isCalculating}
              className="calculate-button"
              aria-describedby="calculation-status"
            >
              {isCalculating ? (
                <>
                  <span className="loading-spinner" aria-hidden="true"></span>
                  Calculating...
                </>
              ) : (
                "Calculate Interest"
              )}
            </button>

            <button
              type="button"
              onClick={resetCalculator}
              className="reset-button"
            >
              Reset All
            </button>
          </div>
        </form>

        {result !== null && (
          <ResultDisplay
            principal={amount}
            finalAmount={result}
            interestType={interestType}
            monthlyRate={monthlyRate}
            period={period}
            compoundFreq={compoundFreq}
          />
        )}
      </main>
    </div>
  );
}
