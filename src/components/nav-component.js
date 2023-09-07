import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = () => {
  let [_id, set_id] = useState(""); //用戶_ID

  const handleLogout = () => {
    AuthService.logout();
    window.alert("成功登出");
  };

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      set_id(AuthService.getCurrentUser().user._id);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
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
                <Link className="nav-link" to="/register">
                  註冊會員
                </Link>
              </li>
            )}
            {!_id && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  會員登入
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

            {_id && (
              <li className="nav-item">
                <Link className="nav-link" to={`/profile/${_id}`}>
                  個人頁面
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
