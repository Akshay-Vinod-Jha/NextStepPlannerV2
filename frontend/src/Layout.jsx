import { Outlet } from "react-router-dom";
import { Header, Footer, ScrollToTop } from "./components";

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
