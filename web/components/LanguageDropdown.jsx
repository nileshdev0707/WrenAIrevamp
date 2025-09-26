import React, { useState, useEffect } from 'react';
import { getAvailableLanguages, getLanguageByCode, detectBrowserLanguage } from "../utils/languageUtils";
import { useLanguage } from "./Navbar";

// Language Dropdown Component
const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Use context for global language state
  const { currentLanguage: selectedLang, changeLanguage, isClient } = useLanguage();
  const languages = getAvailableLanguages();
  const currentLanguage = getLanguageByCode(selectedLang);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const onhandleClick = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle language change using context
  const handleLanguageChange = async (langCode) => {
    setLoading(true);
    try {
      changeLanguage(langCode);
      setIsOpen(false);
      
      // Optional: Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative language-dropdown">
      <button
        onClick={onhandleClick}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        ) : (
          <span className="text-lg">{currentLanguage?.flag}</span>
        )}
        <span className="sm:text-base text-sm sm:block hidden">
          {loading ? 'Switching...' : currentLanguage?.name}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                selectedLang === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="sm:text-base font-medium text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
