import React, { useState } from "react";
import AuthService from "../services/auth.service";

const RegisterComponent = ({ setRegisterModal, setLoginModal }) => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  let [registerLoading, setRegisterLoading] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const hanleRegister = () => {
    if (registerLoading) return;
    setRegisterLoading(true);
    AuthService.register(username, email, password)
      .then(() => {
        window.alert("註冊成功");
        setRegisterModal(false);
        setLoginModal(true);
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response.data.emailExist == true)
          return setMessage("信箱重複"), setRegisterLoading(false);
        setMessage("請輸入正確格式");
        setRegisterLoading(false);
      });
  };

  return (
    <div
      onClick={() => {
        //點選背景關閉
        setRegisterModal(false);
      }}
      className="login_bg"
    >
      <div
        onClick={(e) => {
          //防止點選背景event擴散
          e.stopPropagation();
        }}
        className="register_main"
      >
        <div className="form-group">
          <h1 className="text-center pb-3">註冊</h1>

          <button
            onClick={() => {
              setRegisterModal(false);
            }}
            className="register_close_button"
          >
            X
          </button>
          {message && <div className="alert alert-danger">{message}</div>}

          <label htmlFor="username">用戶名稱:</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
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
            placeholder="長度至少超過6個英文或數字"
          />
          {!registerLoading ? (
            <button
              style={{ marginTop: "1rem", width: "100%" }}
              onClick={hanleRegister}
              className="btn btn-primary"
            >
              <span>註冊會員</span>
            </button>
          ) : (
            <button
              style={{ marginTop: "1rem" }}
              className="register_button_cursor_none"
            >
              <span className="preloader">
                <div className="circ1"></div>
                <div className="circ2"></div>
                <div className="circ3"></div>
                <div className="circ4"></div>
              </span>
            </button>
          )}
        </div>
        <div style={{ margin: "1rem 0rem" }}>
          <span>
            已經有帳號了
            <button
              className="register_to_loginbtn"
              onClick={() => {
                setRegisterModal(false);
                setLoginModal(true);
              }}
            >
              登入
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
