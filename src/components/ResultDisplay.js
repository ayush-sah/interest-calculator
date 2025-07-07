import React from "react";
import { formatCurrency } from "../utils/calculations";

const ResultDisplay = ({
  principal,
  finalAmount,
  interestType,
  monthlyRate,
  period, // period in months for calculations
  periodUnit,
  originalPeriod, // original period value entered by user
  compoundFreq,
}) => {
  const interestEarned = finalAmount - principal;
  const totalReturnPercentage = ((interestEarned / principal) * 100).toFixed(2);

  // Format period display
  const formatPeriodDisplay = () => {
    if (periodUnit === "years") {
      return `${originalPeriod} ${
        originalPeriod === 1 ? "year" : "years"
      } (${period} months)`;
    } else {
      const years = (period / 12).toFixed(1);
      return `${originalPeriod} ${
        originalPeriod === 1 ? "month" : "months"
      } (${years} years)`;
    }
  };

  return (
    <div
      className="result-container"
      role="region"
      aria-label="Calculation Result"
    >
      <h2>Calculation Summary</h2>

      <div className="calculation-info">
        <div className="info-item">
          <span className="info-label">Interest Type:</span>
          <span className="info-value">
            {interestType === "simple"
              ? "Simple Interest"
              : `Compound Interest (${compoundFreq})`}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Monthly Rate:</span>
          <span className="info-value">{monthlyRate}%</span>
        </div>
        <div className="info-item">
          <span className="info-label">Time Period:</span>
          <span className="info-value">{formatPeriodDisplay()}</span>
        </div>
      </div>

      <div className="result-details">
        <div className="result-item">
          <span className="result-label">Principal Amount:</span>
          <span className="result-value">{formatCurrency(principal)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Interest Charged:</span>
          <span className="result-value interest-earned">
            {formatCurrency(interestEarned)}
          </span>
        </div>
        <div className="result-item">
          <span className="result-label">Total Return:</span>
          <span className="result-value">{totalReturnPercentage}%</span>
        </div>
        <div className="result-item final-amount">
          <span className="result-label">Final Amount:</span>
          <span className="result-value">{formatCurrency(finalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
