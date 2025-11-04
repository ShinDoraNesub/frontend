import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectLanguage, getTranslations } from '../utils/i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState({});

  useEffect(() => {
    // Auto-detect browser language on first load
    const savedLang = localStorage.getItem('language');
    const detectedLang = savedLang || detectLanguage();
    setLanguage(detectedLang);
    setT(getTranslations(detectedLang));
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setT(getTranslations(lang));
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};