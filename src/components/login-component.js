import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ _id, set_id, setLoginModal, setRegisterModal }) => {
  const nagivate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  //按下登入系統後出現 loading
  let [loginLoading, setLoginLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    //如果正在Loading就不再送出表單
    if (loginLoading) return;
    setMessage("");
    setLoginLoading(true); //按下送出 出現Loading
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      if (AuthService.getCurrentUser()) {
        set_id(AuthService.getCurrentUser().user._id);
      }
      setLoginLoading(false);
      window.alert("登入成功。");
      // nagivate("/");
      window.location.reload();
      setLoginModal(false);
    } catch (e) {
      if (e.response.data.email === false) {
        setLoginLoading(false);
        setMessage("信箱錯誤");
      }
      if (e.response.data.password === false) {
        setLoginLoading(false);
        setMessage("密碼錯誤");
      }
    }
  };

  return (
    <div className="login_bg">
      <div className="login_main">
        <div className="form-group">
          <button
            onClick={() => {
              setLoginModal(false);
            }}
            className="login_close_button"
          >
            X
          </button>
          <h1 className="text-center pb-3">登入</h1>
          {message && <div className="alert alert-danger">{message}</div>}
          <label htmlFor="username">電子信箱：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
          />
          <button
            onClick={() => {
              setLoginModal(false);
              setRegisterModal(true);
            }}
            className="register_btn"
          >
            註冊帳號
          </button>
        </div>

        <div className="form-group">
          {!loginLoading ? (
            <button onClick={handleLogin} className="btn btn-primary btn-block">
              <span>登入系統</span>
            </button>
          ) : (
            <button className="login_button_cursor_none">
              <span className="preloader">
                <div className="circ1"></div>
                <div className="circ2"></div>
                <div className="circ3"></div>
                <div className="circ4"></div>
              </span>
            </button>
          )}

          <br />

          <br />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
