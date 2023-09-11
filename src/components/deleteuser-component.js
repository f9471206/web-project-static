import React, { useState } from "react";
import UserProfile from "../services/userprofile.service";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const DeleteuserComponent = ({ deleteUserModal, setDeleteUserModal }) => {
  let [password, setPassword] = useState("");

  let [showMes, setShowMes] = useState("");

  const navigate = useNavigate();

  const handleModalClose = () => {
    setDeleteUserModal(false);
  };

  const handlePassword = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleDelSumbit = () => {
    setShowMes("");
    UserProfile.deleteUser(password)
      .then((d) => {
        window.alert("帳號已刪除");
        AuthService.logout();
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.password == false) {
          setShowMes("密碼錯誤");
        }
      });
  };

  return (
    <div
      onClick={() => {
        setDeleteUserModal(false);
      }}
      className="userDeleteBg"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="userDelete"
      >
        <label htmlFor="">
          請輸入密碼 <span style={{ color: "red" }}>{showMes}</span>
        </label>

        <input onChange={handlePassword} type="text" />
        <div className="modal-footer">
          <button
            onClick={handleModalClose}
            type="button"
            className="btn btn-secondary m-1"
          >
            返回
          </button>
          <button
            onClick={handleDelSumbit}
            type="button"
            className="btn btn-danger m-1"
          >
            確定刪除
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteuserComponent;
