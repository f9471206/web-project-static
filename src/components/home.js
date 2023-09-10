import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import PostEditComponent from "./postEdit-component";
import DeleteModal from "./deleteModal-conponent";
import Calculate from "./showtime";
import defaulephoto from "../image/user_photo/userdef.svg.jpg";
import messageSvg from "../image/message/message.svg"; //回復icon
import HomeService from "../services/home.service";
import PostnewComponent from "./postnew-component";
import UserPostService from "../services/userpost.service";

const Home = () => {
  //更新post
  let [result, setResult] = useState("");

  //所有的貼文
  let [AllPostData, setAllPostData] = useState([]);

  //確認 like array 是否有按過了
  let [userId, setUserId] = useState("");

  //要編輯的資料
  let [editData, setEditData] = useState("");

  //選擇其中一篇貼文
  const navigate = useNavigate();
  const handleOnePost = (e) => {
    // HomeService.getOnePost(e.currentTarget.id);
    navigate(e.currentTarget.id);
  };

  //按下LIKE
  const handleLike = (e) => {
    e.stopPropagation();
    if (!userId) return window.alert("請先登入");
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

  let [checkPostID, setCheckPostID] = useState("");
  //編輯按鈕
  const homeHandelEdit = (e) => {
    e.stopPropagation();

    //將選擇的貼文資料存入EditData
    AllPostData.map((d) => {
      if (d._id == e.currentTarget.id) {
        setEditData(d);
      }
    });

    if (checkPostID == e.currentTarget.id) return setCheckPostID(""); //在按一次會關掉
    setCheckPostID(e.currentTarget.id);
  };

  //開啟編貼文
  const [openModal, setOpenModal] = useState(false);
  const handlePostEdit = (e) => {
    e.stopPropagation();
    setOpenModal(true);
    setCheckPostID(""); //按下編輯後 關掉(...)的延伸div
  };

  //開啟刪除貼文
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handlePostDele = (e) => {
    e.stopPropagation();
    setOpenDeleteModal(true);
    setCheckPostID(""); //按下編輯後 關掉(...)的延伸div
    // document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    HomeService.home().then((data) => {
      setAllPostData(data.data);
      setResult("");
    });
    if (AuthService.getCurrentUser()) {
      setUserId(AuthService.getCurrentUser().user._id);
    }
  }, [result, editData]);

  return (
    <div className="container py-4 home_main">
      <PostnewComponent result={result} setResult={setResult} />
      <PostEditComponent
        openModal={openModal}
        setOpenModal={setOpenModal}
        editData={editData}
        setEditData={setEditData}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        editData={editData}
        setEditData={setEditData}
        setAllPostData={setAllPostData}
        AllPostData={AllPostData}
      />

      {AllPostData &&
        AllPostData.map((data) => {
          return (
            <div
              key={data._id}
              id={data._id}
              onClick={handleOnePost}
              className="one_post"
            >
              <div className="post_card">
                <div className="user_photo">
                  {data.author.photo && data.author.photo == "" && (
                    <img src={defaulephoto} alt="" />
                  )}
                  {data.author.photo && data.author.photo != "" && (
                    <img src={data.author.photo} alt="" />
                  )}
                </div>
                <div className="user_info">
                  <h2 className="post_name">
                    {data.author.username && data.author.username}
                  </h2>
                  <p className="post_time">
                    {data.date && Calculate.calculateTime(data.date)}
                  </p>
                </div>
                {userId && userId == data.author._id && (
                  <div className="post_edit_div">
                    <div id={data._id} onClick={homeHandelEdit}>
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                  </div>
                )}

                {userId && data._id == checkPostID && (
                  <>
                    <div id={data._id} className="edit_div">
                      <div id={data._id} onClick={handlePostEdit}>
                        編輯貼文
                      </div>
                      <div onClick={handlePostDele}>刪除貼文</div>
                    </div>
                  </>
                )}
              </div>
              <div className="post_content">
                <p>{data.content && data.content}</p>
                {data.image && (
                  <div className="post_conten_img">
                    <img src={data.image} alt="" />
                  </div>
                )}
              </div>
              {/* post icon */}
              <div className="post_message">
                <div className="message_svg">
                  <img src={messageSvg} alt="" />
                  <p>{data.reply.length}</p>
                </div>
                <div className="heart_svg">
                  {data.like.includes(userId) && (
                    <div
                      onClick={handleLike}
                      id={data._id}
                      className="heart_div"
                    >
                      <i className="fa-regular fa-heart"></i>
                      <p>{data.like.length}</p>
                    </div>
                  )}
                  {!data.like.includes(userId) && (
                    <div
                      onClick={handleLike}
                      id={data._id}
                      className="unheart_div"
                    >
                      <i className="fa-regular fa-heart"></i>
                      <p>{data.like.length}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
