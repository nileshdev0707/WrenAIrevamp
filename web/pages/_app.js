import "../styles/globals.css";
import { LanguageProvider } from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
