import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcherProps } from './types';
import { LANGUAGE_MAP, ARIA_LABEL } from './constants';
import { buttonStyles } from './styles';

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language as keyof typeof LANGUAGE_MAP;
    const newLang = LANGUAGE_MAP[currentLanguage].nextLanguage;
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label={ARIA_LABEL}
      className={`${buttonStyles} ${className || ''}`}
    >
      {LANGUAGE_MAP[i18n.language as keyof typeof LANGUAGE_MAP].label}
    </button>
  );
};