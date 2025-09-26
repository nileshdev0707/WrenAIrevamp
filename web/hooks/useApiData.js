import { useState, useEffect } from "react";

/**
 * Custom hook for handling API data fetching with loading states
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies array for useEffect (default: [])
 * @param {Object} options - Additional options
 * @param {boolean} options.immediate - Whether to fetch immediately (default: true)
 * @param {Function} options.onSuccess - Callback on successful fetch
 * @param {Function} options.onError - Callback on error
 * @returns {Object} { data, loading, error, refetch }
 */
export function useApiData(apiFunction, dependencies = [], options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { immediate = true, onSuccess, onError } = options;

  const fetchData = async () => {
    if (!apiFunction) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiFunction();
      const responseData =
        response?.data?.data?.attributes ??
        response?.data?.data ??
        response?.data ??
        null;
      setData(responseData);

      if (onSuccess) {
        onSuccess(responseData);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);

      if (onError) {
        onError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook specifically for pages that need language support
 * @param {Function} apiFunction - The API function to call (should accept language parameter)
 * @param {Object} languageContext - Object containing currentLanguage and isClient
 * @param {Object} options - Additional options
 * @returns {Object} { data, loading, error, refetch }
 */
export function useApiDataWithLanguage(
  apiFunction,
  languageContext,
  options = {}
) {
  const { currentLanguage, isClient } = languageContext;

  return useApiData(
    isClient ? () => apiFunction(currentLanguage) : null,
    [currentLanguage, isClient],
    options
  );
}
