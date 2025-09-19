import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";

export default function Layout({ children }) {
  return (
    <div className="max-h-screen h-full justify-between flex flex-col">
        <div>
          <Navbar/>
          {children}
        </div>
      <SiteFooter />
    </div>
  );
}
