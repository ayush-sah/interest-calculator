import React, { useState, useCallback } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import PeriodInput from "./components/PeriodInput";
import ResultDisplay from "./components/ResultDisplay";
import LanguageToggle from "./components/LanguageToggle";
import { useLanguage } from "./contexts/LanguageContext";
import { useValidatedInput } from "./hooks/useValidatedInput";
import { t } from "./utils/translations";
import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  validateInputs,
} from "./utils/calculations";
import "./App.css";

export default function InterestCalculator() {
  const { language } = useLanguage();
  const [periodUnit, setPeriodUnit] = useState("months");

  // Validation functions with translations
  const validators = {
    amount: (value) => {
      if (!value || value <= 0) return t("amountRequired", language);
      if (value > 10000000) return t("amountLimit", language);
      return "";
    },
    rate: (value) => {
      if (!value) return t("rateRequired", language);
      if (value < 0) return t("rateNegative", language);
      if (value > 100) return t("rateLimit", language);
      return "";
    },
    period: (value, unit) => {
      if (!value || value <= 0) return t("periodRequired", language);
      const maxValue = unit === "years" ? 100 : 1200;
      const limitKey =
        unit === "years" ? "periodLimitYears" : "periodLimitMonths";
      if (value > maxValue) return t(limitKey, language);
      return "";
    },
  };

  const [amount, setAmount, amountError, isAmountValid, resetAmount] =
    useValidatedInput("", validators.amount);
  const [monthlyRate, setMonthlyRate, rateError, isRateValid, resetRate] =
    useValidatedInput("", validators.rate);
  const [period, setPeriod, periodError, isPeriodValid, resetPeriod] =
    useValidatedInput("", (value) => validators.period(value, periodUnit), [
      periodUnit,
      language,
    ]);

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

  const periodInMonths = periodUnit === "years" ? period * 12 : period;

  const calculateInterest = useCallback(async () => {
    if (!canCalculate) return;

    setIsCalculating(true);
    setCalculationError("");

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const validation = validateInputs(amount, monthlyRate, periodInMonths);

      if (!validation.isValid) {
        setCalculationError(validation.errors.join(", "));
        return;
      }

      let finalAmount;

      if (interestType === "simple") {
        finalAmount = calculateSimpleInterest(
          amount,
          monthlyRate,
          periodInMonths
        );
      } else {
        finalAmount = calculateCompoundInterest(
          amount,
          monthlyRate,
          periodInMonths,
          compoundFreq
        );
      }

      setResult(Math.round(finalAmount * 100) / 100);
    } catch (error) {
      console.error("Calculation error:", error);
      setCalculationError(t("calculationError", language));
    } finally {
      setIsCalculating(false);
    }
  }, [
    amount,
    monthlyRate,
    periodInMonths,
    interestType,
    compoundFreq,
    canCalculate,
    language,
  ]);

  const resetCalculator = useCallback(() => {
    resetAmount();
    resetRate();
    resetPeriod();
    setPeriodUnit("months");
    setInterestType("simple");
    setCompoundFreq("monthly");
    setResult(null);
    setCalculationError("");
  }, [resetAmount, resetRate, resetPeriod]);

  const handlePeriodUnitChange = useCallback(
    (newUnit) => {
      if (period > 0) {
        let convertedPeriod;
        if (newUnit === "years" && periodUnit === "months") {
          convertedPeriod = Math.round((period / 12) * 100) / 100;
        } else if (newUnit === "months" && periodUnit === "years") {
          convertedPeriod = Math.round(period * 12);
        } else {
          convertedPeriod = period;
        }
        setPeriod(convertedPeriod);
      }
      setPeriodUnit(newUnit);
    },
    [period, periodUnit, setPeriod]
  );

  const interestTypeOptions = [
    { value: "simple", label: t("simpleInterest", language) },
    { value: "compound", label: t("compoundInterest", language) },
  ];

  const compoundFreqOptions = [
    { value: "monthly", label: t("monthly", language) },
    { value: "yearly", label: t("yearly", language) },
  ];

  return (
    <div className="calculator-container" data-language={language}>
      <header className="calculator-header">
        <div className="header-top">
          <LanguageToggle />
        </div>
        <h1>{t("title", language)}</h1>
        <p>{t("subtitle", language)}</p>
      </header>

      <main className="calculator-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateInterest();
          }}
        >
          <InputField
            label={t("principalAmount", language)}
            value={amount}
            onChange={setAmount}
            error={amountError}
            placeholder={t("enterAmount", language)}
            min="0"
            max="10000000"
            required
            showRupeeFormat={true}
          />

          <InputField
            label={t("monthlyInterestRate", language)}
            value={monthlyRate}
            onChange={setMonthlyRate}
            error={rateError}
            placeholder={t("enterMonthlyRate", language)}
            min="0"
            max="100"
            step="0.01"
            required
          />

          <PeriodInput
            period={period}
            periodUnit={periodUnit}
            onPeriodChange={setPeriod}
            onUnitChange={handlePeriodUnitChange}
            error={periodError}
            required
          />

          <SelectField
            label={t("interestType", language)}
            value={interestType}
            onChange={setInterestType}
            options={interestTypeOptions}
            required
          />

          {interestType === "compound" && (
            <SelectField
              label={t("compoundingFrequency", language)}
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
                  {t("calculating", language)}
                </>
              ) : (
                t("calculateInterest", language)
              )}
            </button>

            <button
              type="button"
              onClick={resetCalculator}
              className="reset-button"
            >
              {t("resetAll", language)}
            </button>
          </div>
        </form>

        {result !== null && (
          <ResultDisplay
            principal={amount}
            finalAmount={result}
            interestType={interestType}
            monthlyRate={monthlyRate}
            period={periodInMonths}
            periodUnit={periodUnit}
            originalPeriod={period}
            compoundFreq={compoundFreq}
          />
        )}
      </main>
    </div>
  );
}
