import enTranslations from '../json/lang/en.json';
import zhTranslations from '../json/lang/zh.json';

// Translation function that returns the appropriate translation based on language
export const translate = (key) => {
  // Check if we're in browser environment before accessing localStorage
  const currentLanguage = typeof window !== 'undefined' 
    ? (localStorage.getItem("selectedLanguage") || "en")
    : "en";
  const translations = currentLanguage === 'zh' ? zhTranslations : enTranslations;
  return translations[key] || key; // Return the key if translation not found
};

