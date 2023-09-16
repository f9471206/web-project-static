import React, { useState } from "react";
import UserPostService from "../services/userpost.service";
import { useNavigate } from "react-router-dom";

const OnepostDeletemodalComponent = ({
  openDeleteModal,
  setOpenDeleteModal,
  _id,
}) => {
  //按下刪除後重導
  const navigate = useNavigate();

  let [deleteLoading, setDeleteLoading] = useState(false);

  //按下 刪除
  const handleDelete = () => {
    if (deleteLoading) return;
    setDeleteLoading(true);
    UserPostService.delePost(_id)
      .then((d) => {
        if (d.status == 200) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!openDeleteModal) return;
  return (
    <>
      <div
        onClick={() => {
          setOpenDeleteModal(false);
        }}
        className="one_deleteModal_bg"
      >
        <div
          className="one_deleteModal_main"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h3>你確定要刪除此篇貼文</h3>
          <div className="modal-footer">
            {!deleteLoading ? (
              <>
                <button
                  onClick={() => {
                    setOpenDeleteModal(false);
                  }}
                  type="button"
                  className="btn btn-secondary m-1"
                >
                  返回
                </button>

                <button
                  onClick={handleDelete}
                  type="button"
                  className="btn btn-primary m-1"
                >
                  確定刪除
                </button>
              </>
            ) : (
              <button className="onePostDeleteLoading">
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
    </>
  );
};

export default OnepostDeletemodalComponent;
