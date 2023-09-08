import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import FootComponent from "./foot-component";

const Layout = ({ _id, set_id }) => {
  return (
    <>
      <Nav _id={_id} set_id={set_id} />
      <Outlet />
      <FootComponent />
    </>
  );
};

export default Layout;
