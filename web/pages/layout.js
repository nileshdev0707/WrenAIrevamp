import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar/>
      {children}
      <SiteFooter />
    </div>
  );
}
