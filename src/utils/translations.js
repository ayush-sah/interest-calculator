export const translations = {
  en: {
    // Header
    title: "Interest Calculator",
    subtitle: "Calculate simple and compound interest with precision and ease",
    
    // Form Labels
    principalAmount: "Principal Amount",
    monthlyInterestRate: "Monthly Interest Rate",
    months: "Months",
    timePeriod: "Time Period",
    interestType: "Interest Type",
    compoundingFrequency: "Compounding Frequency",
    
    // Input Placeholders
    enterAmount: "Enter amount",
    enterMonthlyRate: "Enter monthly rate (%)",
    enterPeriodMonths: "Enter period in months",
    enterPeriodYears: "Enter period in years",
    
    // Options
    simpleInterest: "Simple Interest",
    compoundInterest: "Compound Interest",
    monthly: "Monthly",
    yearly: "Yearly",
    years: "Years",
    year: "Year",
    month: "Month",
    
    // Toggle Options
    duration: "Duration",
    dateRange: "Date Range",
    inputMode: "Input Mode",
    unit: "Unit",
    language: "Language",
    
    // Buttons
    calculateInterest: "Calculate Interest",
    calculating: "Calculating...",
    resetAll: "Reset All",
    done: "Done",
    
    // Date Picker
    selectDateRange: "Select Date Range",
    startDate: "Start Date:",
    endDate: "End Date:",
    
    // Results
    calculationSummary: "Calculation Summary",
    principalAmountResult: "Principal Amount:",
    interestCharged: "Interest Charged:",
    finalAmount: "Final Amount:",
    
    // Validation Messages
    amountRequired: "Amount must be greater than 0",
    amountLimit: "Amount cannot exceed ₹10,000,000",
    rateRequired: "Interest rate is required",
    rateNegative: "Interest rate cannot be negative",
    rateLimit: "Interest rate cannot exceed 100%",
    periodRequired: "Period must be greater than 0",
    periodLimitMonths: "Period cannot exceed 1200 months",
    periodLimitYears: "Period cannot exceed 100 years",
    calculationError: "An error occurred during calculation. Please check your inputs.",
    
    // Time formatting
    monthsOnly: "months",
    monthOnly: "month",
    yearsOnly: "years",
    yearOnly: "year"
  },
  hi: {
    // Header
    title: "ब्याज कैलकुलेटर",
    subtitle: "सटीकता और आसानी के साथ साधारण और चक्रवृद्धि ब्याज की गणना करें",
    
    // Form Labels
    principalAmount: "मूल राशि",
    monthlyInterestRate: "मासिक ब्याज दर",
    months: "महीने",
    timePeriod: "समय अवधि",
    interestType: "ब्याज प्रकार",
    compoundingFrequency: "चक्रवृद्धि आवृत्ति",
    
    // Input Placeholders
    enterAmount: "राशि दर्ज करें",
    enterMonthlyRate: "मासिक दर दर्ज करें (%)",
    enterPeriodMonths: "महीनों में अवधि दर्ज करें",
    enterPeriodYears: "वर्षों में अवधि दर्ज करें",
    
    // Options
    simpleInterest: "साधारण ब्याज",
    compoundInterest: "चक्रवृद्धि ब्याज",
    monthly: "मासिक",
    yearly: "वार्षिक",
    years: "वर्ष",
    year: "वर्ष",
    month: "महीना",
    
    // Toggle Options
    duration: "अवधि",
    dateRange: "दिनांक सीमा",
    inputMode: "इनपुट मोड",
    unit: "इकाई",
    language: "भाषा",
    
    // Buttons
    calculateInterest: "ब्याज की गणना करें",
    calculating: "गणना हो रही है...",
    resetAll: "सभी रीसेट करें",
    done: "पूर्ण",
    
    // Date Picker
    selectDateRange: "दिनांक सीमा चुनें",
    startDate: "प्रारंभ दिनांक:",
    endDate: "समाप्ति दिनांक:",
    
    // Results
    calculationSummary: "गणना सारांश",
    principalAmountResult: "मूल राशि:",
    interestCharged: "ब्याज लगाया गया:",
    finalAmount: "अंतिम राशि:",
    
    // Validation Messages
    amountRequired: "राशि 0 से अधिक होनी चाहिए",
    amountLimit: "राशि ₹10,000,000 से अधिक नहीं हो सकती",
    rateRequired: "ब्याज दर आवश्यक है",
    rateNegative: "ब्याज दर नकारात्मक नहीं हो सकती",
    rateLimit: "ब्याज दर 100% से अधिक नहीं हो सकती",
    periodRequired: "अवधि 0 से अधिक होनी चाहिए",
    periodLimitMonths: "अवधि 1200 महीनों से अधिक नहीं हो सकती",
    periodLimitYears: "अवधि 100 वर्षों से अधिक नहीं हो सकती",
    calculationError: "गणना के दौरान एक त्रुटि हुई। कृपया अपने इनपुट की जांच करें।",
    
    // Time formatting
    monthsOnly: "महीने",
    monthOnly: "महीना",
    yearsOnly: "वर्ष",
    yearOnly: "वर्ष"
  }
};

export const t = (key, language = 'en') => {
  return translations[language]?.[key] || translations.en[key] || key;
};