import React from "react";
import { formatCurrency } from "../utils/calculations";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../utils/translations";

const ResultDisplay = ({
  principal,
  finalAmount,
  interestType,
  monthlyRate,
  period,
  periodUnit,
  originalPeriod,
  compoundFreq,
}) => {
  const { language } = useLanguage();
  const interestEarned = finalAmount - principal;

  const formatPeriodDisplay = () => {
    const totalMonths = period;

    if (totalMonths < 12) {
      const monthText =
        totalMonths === 1
          ? t("monthOnly", language)
          : t("monthsOnly", language);
      return `${totalMonths} ${monthText}`;
    }

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    let displayText = "";

    if (years > 0) {
      const yearText =
        years === 1 ? t("yearOnly", language) : t("yearsOnly", language);
      displayText += `${years} ${yearText}`;
    }

    if (remainingMonths > 0) {
      if (displayText) displayText += " ";
      const monthText =
        remainingMonths === 1
          ? t("monthOnly", language)
          : t("monthsOnly", language);
      displayText += `${remainingMonths} ${monthText}`;
    }

    displayText += ` (${totalMonths} ${t("monthsOnly", language)})`;

    return displayText;
  };

  const getInterestTypeDisplay = () => {
    if (interestType === "simple") {
      return t("simpleInterest", language);
    } else {
      const freqText =
        compoundFreq === "monthly"
          ? t("monthly", language)
          : t("yearly", language);
      return `${t("compoundInterest", language)} (${freqText})`;
    }
  };

  return (
    <div
      className="result-container"
      role="region"
      aria-label="Calculation Result"
    >
      <h2>{t("calculationSummary", language)}</h2>

      <div className="calculation-info">
        <div className="info-item">
          <span className="info-label">{t("interestType", language)}:</span>
          <span className="info-value">{getInterestTypeDisplay()}</span>
        </div>
        <div className="info-item">
          <span className="info-label">
            {t("monthlyInterestRate", language)}:
          </span>
          <span className="info-value">{monthlyRate}%</span>
        </div>
        <div className="info-item">
          <span className="info-label">{t("timePeriod", language)}:</span>
          <span className="info-value">{formatPeriodDisplay()}</span>
        </div>
      </div>

      <div className="result-details">
        <div className="result-item">
          <span className="result-label">
            {t("principalAmountResult", language)}
          </span>
          <span className="result-value">{formatCurrency(principal)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">{t("interestCharged", language)}</span>
          <span className="result-value interest-earned">
            {formatCurrency(interestEarned)}
          </span>
        </div>
        <div className="result-item final-amount">
          <span className="result-label">{t("finalAmount", language)}</span>
          <span className="result-value">{formatCurrency(finalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
