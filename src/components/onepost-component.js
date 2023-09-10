import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeService from "../services/home.service";
import ReplyPostComponent from "./replypost-component";
import ReplysComponent from "./replys-component";
import PostEditComponent from "./postEdit-component";
import OnepostDeletemodalComponent from "./onepostdeletemodal-component";
import Calculate from "./showtime";
import AuthService from "../services/auth.service";
import UserPostService from "../services/userpost.service";
import messageSvg from "../image/message/message.svg"; //回復icon
import defaulephoto from "../image/user_photo/userdef.svg";

function OnepostComponent() {
  let [user_id, setUser_id] = useState(""); //登入後的ID

  let [newReply, setNewReply] = useState("");

  let [postData, setPostData] = useState();

  let { _id } = useParams(); //取得網址上POST ID (文章的_ID)

  //三個點的Modal
  let [editModal, setEditModal] = useState(false);

  //開啟編貼文
  const [openModal, setOpenModal] = useState(false);

  //開啟刪除貼文
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleLike = (e) => {
    if (!user_id) return window.alert("請先登入");
    let post_id = e.currentTarget.id;
    let classList = e.currentTarget;
    if (!e.currentTarget.classList.contains("heart_div")) {
      //準費發出喜歡
      classList.classList.remove("unheart_div");
      classList.classList.add("heart_div");
      //增加LIKE 數字
      let addNumber = Number(classList.children[1].innerText) + 1;
      classList.children[1].innerText = addNumber;
      UserPostService.likePost(post_id)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      classList.classList.remove("heart_div");
      classList.classList.add("unheart_div");
      //減少LIKE 數字
      let addNumber = Number(classList.children[1].innerText) - 1;
      classList.children[1].innerText = addNumber;
      UserPostService.CancelLikePost(post_id)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //點選三個點的按鈕
  const handleEdit = () => {
    if (editModal == true) {
      setEditModal(false);
    } else {
      setEditModal(true);
    }
  };

  useEffect(() => {
    HomeService.getOnePost(_id)
      .then((data) => {
        setPostData(data.data);
        setNewReply("");
      })
      .catch((err) => {
        console.log(err);
      });
    if (AuthService.getCurrentUser()) {
      setUser_id(AuthService.getCurrentUser().user._id);
    }
  }, [newReply]);

  return (
    <div className="container py-4 home_main">
      <PostEditComponent
        //編輯頁面 modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        editData={postData}
        setEditData={setPostData}
      />
      <OnepostDeletemodalComponent
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        _id={_id}
      />
      {postData && (
        <div className="one_post_detail">
          <div className="post_card">
            <div className="user_photo">
              {postData.author.photo && postData.author.photo == "" && (
                <img src={defaulephoto} alt="" />
              )}
              {!postData.author.photo && (
                <img src={postData.author.photo} alt="" />
              )}
            </div>
            <div className="user_info">
              <h2 className="post_name">
                {postData.author.username && postData.author.username}
              </h2>
              <p className="post_time">
                {postData.date && Calculate.calculateTime(postData.date)}
              </p>
            </div>

            {user_id && user_id == postData.author._id && (
              <>
                <div className="one_post_edit" onClick={handleEdit}>
                  <div id={postData._id}>
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                </div>
                {editModal && ( //點選三個點後下方出現的選單
                  <>
                    <div id={postData._id} className="edit_div">
                      <div
                        onClick={() => {
                          setOpenModal(true);
                          setEditModal(false);
                        }}
                      >
                        編輯貼文
                      </div>

                      <div
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setEditModal(false);
                        }}
                      >
                        刪除貼文
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="post_content">
            <p>{postData.content && postData.content}</p>

            <div className="post_conten_img">
              {postData.image && <img src={postData.image} alt="" />}
            </div>
          </div>
          <div className="post_message">
            <div className="message_svg">
              <img src={messageSvg} alt="" />
              <p>{postData && postData.reply.length}</p>
            </div>
            <div className="heart_svg">
              {postData.like.includes(user_id) && (
                <div
                  id={postData._id}
                  onClick={handleLike}
                  className="heart_div"
                >
                  <i className="fa-regular fa-heart"></i>
                  <p>{postData.like.length}</p>
                </div>
              )}
              {!postData.like.includes(user_id) && (
                <div
                  id={postData._id}
                  onClick={handleLike}
                  className="unheart_div"
                >
                  <i className="fa-regular fa-heart"></i>
                  <p>{postData.like.length}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ReplyPostComponent _id={_id} setNewReply={setNewReply} />
      <hr />
      <ReplysComponent newReply={newReply} />
    </div>
  );
}

export default OnepostComponent;
