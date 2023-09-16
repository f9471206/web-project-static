import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import LoginComponent from "./login-component";
import RegisterComponent from "./register-component";
import FootComponent from "./foot-component";
import { useState, useEffect } from "react";

const Layout = ({ _id, set_id }) => {
  //登入的Modal
  let [loginModal, setLoginModal] = useState(false);

  //註冊的Modal
  let [registerModal, setRegisterModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLoginModal(false);
        setRegisterModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Nav
        _id={_id}
        set_id={set_id}
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
      />
      {loginModal && (
        <LoginComponent
          _id={_id}
          set_id={set_id}
          setLoginModal={setLoginModal}
          setRegisterModal={setRegisterModal}
        />
      )}
      {registerModal && (
        <RegisterComponent
          setLoginModal={setLoginModal}
          setRegisterModal={setRegisterModal}
        />
      )}

      <Outlet />
      <FootComponent />
    </>
  );
};

export default Layout;
