import Nav from "./nav-components";
import { Outlet } from "react-router-dom";
import FooterComponents from "./footer-components";
const Layout = () => {
  return (
    <>
      <Nav />
      <div className="page-content">
        <Outlet />
      </div>
      <FooterComponents />
    </>
  );
};

export default Layout;
