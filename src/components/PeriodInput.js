import React, { useState } from "react";
import InputField from "./InputField";
import ToggleSwitch from "./ToggleSwitch";
import DateRangePicker from "./DateRangePicker";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../utils/translations";

const PeriodInput = ({
  period,
  periodUnit,
  onPeriodChange,
  onUnitChange,
  error,
  required = false,
}) => {
  const { language } = useLanguage();
  const [inputMode, setInputMode] = useState("duration");
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const inputModeOptions = {
    leftOption: { value: "duration", label: t("duration", language) },
    rightOption: { value: "dateRange", label: t("dateRange", language) },
  };

  const periodUnitOptions = {
    leftOption: { value: "months", label: t("months", language) },
    rightOption: { value: "years", label: t("years", language) },
  };

  const handleYearMonthChange = (newYears, newMonths) => {
    setYears(newYears || 0);
    setMonths(newMonths || 0);
    const totalMonths = (newYears || 0) * 12 + (newMonths || 0);
    onPeriodChange(totalMonths);
  };

  const handleDateRangeChange = (start, end, calculatedPeriod) => {
    setStartDate(start);
    setEndDate(end);
    onPeriodChange(calculatedPeriod);
  };

  const getInputLabel = () => {
    if (periodUnit === "months") {
      return t("months", language);
    } else if (periodUnit === "years") {
      return t("timePeriod", language);
    }
    return t("timePeriod", language);
  };

  const getPlaceholder = () => {
    return periodUnit === "months"
      ? t("enterPeriodMonths", language)
      : t("enterPeriodYears", language);
  };

  return (
    <div className="period-input-group">
      <div className="period-mode-toggle">
        <ToggleSwitch
          label={t("inputMode", language)}
          leftOption={inputModeOptions.leftOption}
          rightOption={inputModeOptions.rightOption}
          value={inputMode}
          onChange={setInputMode}
        />
      </div>

      {inputMode === "duration" ? (
        <div className="period-input-container">
          {periodUnit === "years" ? (
            <div className="year-month-inputs">
              <div className="year-input">
                <InputField
                  label={t("years", language)}
                  value={years}
                  onChange={(value) => handleYearMonthChange(value, months)}
                  placeholder={t("years", language)}
                  min="0"
                  max="100"
                />
              </div>
              <div className="month-input">
                <InputField
                  label={t("months", language)}
                  value={months}
                  onChange={(value) => handleYearMonthChange(years, value)}
                  placeholder={t("months", language)}
                  min="0"
                  max="11"
                />
              </div>
            </div>
          ) : (
            <div className="period-input-field">
              <InputField
                label={getInputLabel()}
                value={period}
                onChange={onPeriodChange}
                error={error}
                placeholder={getPlaceholder()}
                min="0"
                max={periodUnit === "years" ? "100" : "1200"}
                step={periodUnit === "years" ? "0.1" : "1"}
                required={required}
              />
            </div>
          )}

          <div className="period-toggle-container">
            <ToggleSwitch
              label={t("unit", language)}
              leftOption={periodUnitOptions.leftOption}
              rightOption={periodUnitOptions.rightOption}
              value={periodUnit}
              onChange={onUnitChange}
            />
          </div>
        </div>
      ) : (
        <DateRangePicker
          label={t("selectDateRange", language)}
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateRangeChange}
          error={error}
          required={required}
        />
      )}
    </div>
  );
};

export default PeriodInput;
