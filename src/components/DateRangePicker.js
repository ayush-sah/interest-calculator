import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../utils/translations";

const DateRangePicker = ({
  label,
  startDate,
  endDate,
  onDateChange,
  error,
  required = false,
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const calculatePeriodInMonths = (start, end) => {
    if (!start || !end) return 0;

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    const yearDiff = endDateObj.getFullYear() - startDateObj.getFullYear();
    const monthDiff = endDateObj.getMonth() - startDateObj.getMonth();

    return yearDiff * 12 + monthDiff;
  };

  const handleDone = () => {
    const period = calculatePeriodInMonths(tempStartDate, tempEndDate);
    onDateChange(tempStartDate, tempEndDate, period);
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (!startDate || !endDate) return "";

    const start = new Date(startDate).toLocaleDateString(
      language === "hi" ? "hi-IN" : "en-IN"
    );
    const end = new Date(endDate).toLocaleDateString(
      language === "hi" ? "hi-IN" : "en-IN"
    );

    return `${start} - ${end}`;
  };

  return (
    <div className="input-group">
      <label className="input-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>

      <div className="date-range-container">
        <button
          type="button"
          className={`date-range-button ${error ? "input-error" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="date-range-text">
            {formatDateRange() || t("selectDateRange", language)}
          </span>
          <span className="date-range-icon">📅</span>
        </button>

        {isOpen && (
          <div className="date-range-popup">
            <div className="date-input-group">
              <label>{t("startDate", language)}</label>
              <input
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
                className="date-input"
              />
            </div>

            <div className="date-input-group">
              <label>{t("endDate", language)}</label>
              <input
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
                className="date-input"
                min={tempStartDate}
              />
            </div>

            <button
              type="button"
              onClick={handleDone}
              className="date-range-close"
              disabled={!tempStartDate || !tempEndDate}
            >
              {t("done", language)}
            </button>
          </div>
        )}
      </div>

      {error && (
        <span className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default DateRangePicker;
