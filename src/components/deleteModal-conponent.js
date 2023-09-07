import React from "react";
import UserPostService from "../services/userpost.service";

const DeleteModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  editData, //取得資料
  setAllPostData,
  AllPostData,
}) => {
  //還沒按下刪除之前都是 false
  if (openDeleteModal == false) return;

  const handleDelete = () => {
    let _id = editData._id; //文章的ID

    UserPostService.delePost(_id)
      .then((d) => {
        setOpenDeleteModal(false);
        setAllPostData(AllPostData.filter((m) => m._id !== _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      onClick={() => {
        setOpenDeleteModal(false);
      }}
      className="deleteModale_background"
    >
      <div
        onClick={(e) => {
          //防止點選黑色背景關閉的擴散
          e.stopPropagation();
        }}
        className="deleteModale_container"
      >
        <div>
          <button
            className="close_delete_modale"
            onClick={() => {
              setOpenDeleteModal(false);
              // document.body.style.overflow = "auto";
            }}
          >
            X
          </button>

          <h3>刪除貼文</h3>
        </div>
        <p>{editData.content}</p>
        {editData.image && (
          <div className="delete_image_div">
            <img
              className="delete_image"
              src={require(`../image/post_content/${editData.image}`)}
              alt=""
            />
          </div>
        )}
        <div className="delte_submit_div">
          <button onClick={handleDelete} className="delete_button">
            確定刪除
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
