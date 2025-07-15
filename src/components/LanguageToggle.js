import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  const languageOptions = {
    leftOption: { value: 'en', label: 'English' },
    rightOption: { value: 'hi', label: 'हिंदी' }
  };

  return (
    <div className="language-toggle-container">
      <div className="language-toggle">
        <span className={`language-option ${language === 'en' ? 'active' : ''}`}>
          English
        </span>
        <button
          type="button"
          className={`toggle-switch ${language === 'hi' ? 'toggled' : ''}`}
          onClick={toggleLanguage}
          aria-label="Switch language"
          aria-pressed={language === 'hi'}
        >
          <span className="toggle-slider" />
        </button>
        <span className={`language-option ${language === 'hi' ? 'active' : ''}`}>
          हिंदी
        </span>
      </div>
    </div>
  );
};

export default LanguageToggle;