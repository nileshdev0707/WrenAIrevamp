import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";

// Import translations directly to avoid async loading
import enTranslations from "../public/locales/en/common.json";
import zhTranslations from "../public/locales/zh/common.json";

// Translation cache to avoid re-importing
const translationCache = {
  en: enTranslations,
  zh: zhTranslations,
};

// Simple translation hook for Next.js i18n
export function useTranslation(namespace = "common") {
  const { locale } = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get translations synchronously to prevent flickering
  const translations = useMemo(() => {
    return translationCache[locale] || translationCache.en || {};
  }, [locale]);

  const t = (key, fallback = key) => {
    // During SSR, return the key to prevent hydration mismatch
    if (!isClient) {
      return fallback;
    }
    return translations[key] || fallback;
  };

  return {
    t,
    locale,
    isLoading: false,
    isClient,
  };
}

// For server-side rendering, you can preload translations
export function getStaticTranslations(locale, namespace = "common") {
  try {
    // This would be used in getStaticProps/getServerSideProps
    const translations = require(`../public/locales/${locale}/${namespace}.json`);
    return translations;
  } catch (error) {
    console.warn(`Could not load translations for ${locale}/${namespace}`);
    return {};
  }
}
