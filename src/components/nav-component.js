import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useEffect, useState } from "react";
import authService from "../services/auth.service";

const NavComponent = ({
  _id,
  set_id,
  loginModal,
  setLoginModal,
  registerModal,
  setRegisterModal,
}) => {
  const handleLogout = () => {
    AuthService.logout();
    set_id("");
    setUserTouch(false);
    window.alert("成功登出");
  };

  const LoginHandle = (e) => {
    e.preventDefault();
    if (loginModal) return setLoginModal(false);
    setLoginModal(true);
  };

  const registerHandle = (e) => {
    e.preventDefault();
    if (registerModal) return setRegisterModal(false);
    setRegisterModal(true);
  };

  //hover userPhoto
  const [userTouch, setUserTouch] = useState(false);
  const handleUserIcon = (e) => {
    e.preventDefault();
    setUserTouch(true);
  };

  //navbar box shodow
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      window.addEventListener("click", () => {
        setUserTouch(false);
      });
    });
  });

  return (
    <>
      <nav
        className={`${
          scrolled ? "scrolled" : ""
        } navbar navbar-expand-lg navbar-light fs-5`}
      >
        <div className="container-fluid ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div style={{ border: "none" }} className="navbar-toggler">
            {!_id && (
              <Link
                onMouseEnter={handleUserIcon}
                className="nav-link ms-auto userPhoto"
                to=""
                style={{ display: "flex" }}
              >
                <div className="nav-user ">
                  <i className="fa-regular fa-user"></i>
                </div>
              </Link>
            )}
            {_id && AuthService.getCurrentUser().user.photo == undefined && (
              <Link
                onMouseEnter={handleUserIcon}
                className="nav-link ms-auto userPhoto"
                style={{ display: "flex" }}
              >
                <div className="nav-user ">
                  <i className="fa-regular fa-user"></i>
                </div>
              </Link>
            )}
            {_id && AuthService.getCurrentUser().user.photo != undefined && (
              <Link
                onMouseEnter={handleUserIcon}
                className="nav-link ms-auto userPhoto"
                to="#"
                style={{ display: "flex" }}
              >
                <div className="nav-user">
                  <img src={AuthService.getCurrentUser().user.photo} alt="" />
                </div>
              </Link>
            )}
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  文章列表
                </Link>
              </li>
              {!_id && (
                <li className="nav-item">
                  <Link onClick={LoginHandle} className="nav-link" to="">
                    會員登入
                  </Link>
                </li>
              )}
              {!_id && (
                <li className="nav-item">
                  <Link onClick={registerHandle} className="nav-link" to="">
                    註冊會員
                  </Link>
                </li>
              )}
              {_id && (
                <li className="nav-item">
                  <Link className="nav-link" to={`/profile/${_id}`}>
                    個人頁面
                  </Link>
                </li>
              )}
              {_id && (
                <li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link" to="/">
                    登出
                  </Link>
                </li>
              )}
            </ul>
            {!_id && (
              <Link
                onMouseEnter={handleUserIcon}
                className="nav-link ms-auto userPhoto"
                to=""
              >
                <div className="nav-user ">
                  <i className="fa-regular fa-user"></i>
                </div>
                <div className="nav_username"></div>
              </Link>
            )}
            {_id && AuthService.getCurrentUser().user.photo == undefined && (
              <Link
                onMouseEnter={handleUserIcon}
                className="nav-link ms-auto userPhoto"
                to=""
              >
                <div className="nav-user ">
                  <i className="fa-regular fa-user"></i>
                </div>
                <div className="nav_username">
                  <span>{authService.getCurrentUser().user.username}</span>
                </div>{" "}
              </Link>
            )}
            {_id && AuthService.getCurrentUser().user.photo != undefined && (
              <Link
                onMouseEnter={handleUserIcon}
                className="nav-link ms-auto userPhoto"
                to="#"
              >
                <div className="nav-user">
                  <img src={AuthService.getCurrentUser().user.photo} alt="" />
                </div>
                <div className="nav_username">
                  <span>{authService.getCurrentUser().user.username}</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>
      {userTouch && (
        <div
          onMouseLeave={() => {
            //離開後關閉下彈
            setUserTouch(false);
          }}
          onClick={(e) => {
            //防止 userTouch 的擴散
            e.stopPropagation();
          }}
          className="myShowUser"
        >
          {!_id && (
            <Link onClick={LoginHandle} className="nav-link" to="">
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              會員登入
            </Link>
          )}
          {!_id && (
            <Link onClick={registerHandle} className="nav-link" to="">
              <i className="fa-solid fa-user-plus"></i>
              註冊會員
            </Link>
          )}
          {_id && (
            <Link
              onClick={() => {
                setUserTouch(false);
              }}
              className="nav-link"
              to={`/profile/${_id}`}
            >
              <i className="fa-regular fa-address-card"></i>
              個人頁面
            </Link>
          )}
          {_id && (
            <>
              <hr />
              <Link onClick={handleLogout} className="nav-link" to="/">
                <i className="fa-solid fa-right-from-bracket"></i>
                登出
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NavComponent;
