import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

const Layout = ({ children, showFooter }) => (
  <>
    <Header />
    {children}
    {showFooter && <Footer />}
  </>
);

export default Layout;
