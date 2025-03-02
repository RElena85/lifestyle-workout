// components/LanguageSwitcher/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcherProps } from './types';
import { LANGUAGE_MAP, ARIA_LABEL } from './constants';
import { standardButtonStyles } from '../ButtonsBar/standardButtonStyles';
import { Globe } from 'lucide-react'; // Added icon for consistency
import { Button } from '../ui/button';

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = () => {
  const { i18n } = useTranslation();

  const currentLanguage = (i18n.language as keyof typeof LANGUAGE_MAP) in LANGUAGE_MAP
    ? (i18n.language as keyof typeof LANGUAGE_MAP)
    : 'en';

  const toggleLanguage = () => {
    const newLang = LANGUAGE_MAP[currentLanguage].nextLanguage;
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      aria-label={ARIA_LABEL}
      className={standardButtonStyles}
    >
      <Globe className="w-5 h-5" />
      <span>{LANGUAGE_MAP[currentLanguage].label}</span>
    </Button>
  );
};