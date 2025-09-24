// Language utility functions

export const LANGUAGE_STORAGE_KEY = 'selectedLanguage';
export const LANGUAGE_DATA_KEY = 'languageData';

// Get language from localStorage
export const getStoredLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
  }
  return 'en';
};

// Save language to localStorage
export const saveLanguage = (langCode) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, langCode);
    document.documentElement.lang = langCode;
    
    // Trigger custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: langCode } 
    }));
  }
};

// Get cached language data from localStorage
export const getCachedLanguageData = (langCode) => {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(`${LANGUAGE_DATA_KEY}_${langCode}`);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Error parsing cached language data:', error);
      return null;
    }
  }
  return null;
};

// Save language data to localStorage cache
export const cacheLanguageData = (langCode, data) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`${LANGUAGE_DATA_KEY}_${langCode}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error caching language data:', error);
    }
  }
};

// Clear all language cache
export const clearLanguageCache = () => {
  if (typeof window !== 'undefined') {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(LANGUAGE_DATA_KEY)) {
        localStorage.removeItem(key);
      }
    });
  }
};

// Get language data from API
export const fetchLanguageData = async (langCode, apiFunction) => {
  try {
    const response = await apiFunction(langCode);
    return response.data;
  } catch (error) {
    console.error('Error fetching language data:', error);
    throw error;
  }
};

// Language configuration
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    direction: 'ltr'
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    direction: 'ltr'
  }
};

// Get all available languages
export const getAvailableLanguages = () => {
  return Object.values(LANGUAGES);
};

// Get language by code
export const getLanguageByCode = (code) => {
  return LANGUAGES[code] || LANGUAGES.en;
};

// Check if language is RTL
export const isRTL = (langCode) => {
  return getLanguageByCode(langCode).direction === 'rtl';
};

// Format date based on language
export const formatDate = (date, langCode) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat(langCode, options).format(new Date(date));
};

// Format number based on language
export const formatNumber = (number, langCode) => {
  return new Intl.NumberFormat(langCode).format(number);
};

