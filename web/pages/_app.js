import "../styles/globals.css";
import { LanguageProvider } from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider serverLanguage={pageProps.serverLanguage}>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
