import enTranslations from "../json/lang/en.json";
import zhTranslations from "../json/lang/zh.json";

// Translation function that returns the appropriate translation based on language
export const translate = (key, language = null) => {
  // Use provided language or check localStorage
  const currentLanguage =
    language ||
    (typeof window !== "undefined"
      ? localStorage.getItem("selectedLanguage") || "en"
      : "en");
  const translations =
    currentLanguage === "zh" ? zhTranslations : enTranslations;
  return translations[key] || key; // Return the key if translation not found
};

// Safe translate function for SSR compatibility
export const safeTranslate = (key, isClient = false, language = "en") => {
  if (!isClient) return key; // Return key during SSR to prevent hydration mismatch
  return translate(key, language);
};
