import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import SEO from "../components/SEO";

export default function Layout({
  children,
  seoData,
  pageTitle,
  pageDescription,
}) {
  return (
    <>
      <SEO
        seoData={seoData}
        fallbackTitle={pageTitle}
        fallbackDescription={pageDescription}
      />
      <div className="max-h-screen h-full justify-between flex flex-col">
        <div>
          <Navbar />
          {children}
        </div>
        <SiteFooter />
      </div>
    </>
  );
}
