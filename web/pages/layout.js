import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";

export default function Layout({ children, navigation }) {
  return (
    <div>
      <Navbar navigation={navigation} />
      {children}
      <SiteFooter />
    </div>
  );
}