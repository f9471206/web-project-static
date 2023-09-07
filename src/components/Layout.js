import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import FootComponent from "./foot-component";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <FootComponent />
    </>
  );
};

export default Layout;
