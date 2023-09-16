import React, { useState } from "react";
import UserProfile from "../services/userprofile.service";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const DeleteuserComponent = ({
  deleteUserModal,
  setDeleteUserModal,
  user_id,
  setuser_id,
}) => {
  let [password, setPassword] = useState("");

  let [showMes, setShowMes] = useState("");

  let [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  const handleModalClose = () => {
    setDeleteUserModal(false);
  };

  const handlePassword = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleDelSumbit = () => {
    if (deleteLoading) return;
    setShowMes("");
    setDeleteLoading(true);
    UserProfile.deleteUser(password)
      .then((d) => {
        window.alert("帳號已刪除");
        AuthService.logout();
        setuser_id("");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.password == false) {
          setShowMes("密碼錯誤");
          setDeleteLoading(false);
        }
      });
  };

  return (
    <div className="userDeleteBg">
      <div className="userDelete">
        <label htmlFor="">
          請輸入密碼 <span style={{ color: "red" }}>{showMes}</span>
        </label>

        <input onChange={handlePassword} type="text" />
        <div className="modal-footer">
          {!deleteLoading ? (
            <>
              {" "}
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
            </>
          ) : (
            <button className="userdeleteLoading m-1">
              <span className="preloader">
                <div className="circ1"></div>
                <div className="circ2"></div>
                <div className="circ3"></div>
                <div className="circ4"></div>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteuserComponent;
