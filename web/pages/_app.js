import "../styles/globals.css";
import "../styles/pricing-tooltip.css"
import { LanguageProvider } from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider serverLanguage={pageProps.serverLanguage}>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
