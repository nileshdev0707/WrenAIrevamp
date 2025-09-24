import { useState, useEffect } from 'react';
import { getLanguageApi } from '../service/apiClient';
import {cacheLanguageData } from '../utils/languageUtils';
import { useLanguage } from '../components/Navbar';

// Custom hook for managing language data with API integration and caching
export const useLanguageData = () => {
  const { currentLanguage, isClient } = useLanguage();
  const [languageData, setLanguageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanguageData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch from API if not cached
        const res = await getLanguageApi(currentLanguage);
        console.log(res,'res 855885');
        // Cache the data
        cacheLanguageData(currentLanguage, res.data);
        setLanguageData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
      fetchLanguageData();
  }, [currentLanguage, isClient]);

  return {
    languageData,
    loading,
    error,
    currentLanguage
  };
};
// Hook for listening to language changes
export const useLanguageChange = (callback) => {
  useEffect(() => {
    const handleLanguageChange = (event) => {
      callback(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, [callback]);
};
