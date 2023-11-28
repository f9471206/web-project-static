import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import PostEditComponent from "./postEdit-component";
import DeleteModal from "./deleteModal-conponent";
import HomeLoadingConponent from "./homeLoading-conponent";
import TotopCompomponent from "./totop-compomponent";
import Calculate from "./showtime";
import defaulephoto from "../image/user_photo/userdef.svg";
import messageSvg from "../image/message/message.svg"; //回復icon
import HomeService from "../services/home.service";
import PostnewComponent from "./postnew-component";
import UserPostService from "../services/userpost.service";

const Home = () => {
  // setInterval(function () {
  //   console.log("更新一次");
  //   window.location.reload(1);
  // }, 600000);

  //貼文排序按鈕
  let myHomeSort = document.querySelector("#myHomeSort");
  let myIcon = document.querySelector("#myIcon");

  //
  const [sortID, setSortID] = useState(0);

  //更新post
  let [result, setResult] = useState("");

  //排序
  const handleSort = (e) => {
    setSortID(e.target.id);
    myHomeSort.classList.toggle("my_home_sort_display");
    if (myHomeSort.classList.contains("my_home_sort_display")) {
      myIcon.style.transform = "rotate(0deg)";
    } else {
      myIcon.style.transform = "rotate(180deg)";
    }
  };

  //所有的貼文
  let [AllPostData, setAllPostData] = useState([]);

  //最新貼文
  if (sortID == 0) {
    AllPostData.sort((b, a) => {
      return new Date(a.date) - new Date(b.date);
    });
  } //最早貼文
  if (sortID == 1) {
    AllPostData.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  } //最多喜歡
  if (sortID == 2) {
    AllPostData.sort((b, a) => {
      return a.like.length - b.like.length;
    });
  } //最多留言
  if (sortID == 3) {
    AllPostData.sort((b, a) => {
      return a.reply.length - b.reply.length;
    });
  }

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
      {AllPostData == "" && <HomeLoadingConponent />}
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
      {/* 文章排序 */}
      {AllPostData != "" && (
        <div
          style={{
            padding: "1rem 0 ",
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
          }}
        >
          <div
            className="my_post_sort"
            style={{
              display: "flex",
              alignContent: "center",
            }}
          >
            <span
              onClick={() => {
                myHomeSort.classList.toggle("my_home_sort_display");
                if (myHomeSort.classList.contains("my_home_sort_display")) {
                  myIcon.style.transform = "rotate(0deg)";
                } else {
                  myIcon.style.transform = "rotate(180deg)";
                }
              }}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                padding: "0.25rem",
                display: "flex",
                userSelect: "none",
              }}
            >
              {sortID == 0 && "最新"}
              {sortID == 1 && "最早"}
              {sortID == 2 && "最多喜歡"}
              {sortID == 3 && "最多留言"}
              <i
                id="myIcon"
                style={{
                  padding: "0 0.5rem",
                  fontSize: "1.5rem",
                  transition: "all 0.25s ease",
                }}
                className="fa-solid fa-sort-down myIcon"
              ></i>
            </span>
          </div>
          <div style={{ display: "flex", position: "relative" }}>
            <ul id="myHomeSort" className="my_home_sort my_home_sort_display">
              <li onClick={handleSort} id="0">
                最新
              </li>
              <li onClick={handleSort} id="1">
                最早
              </li>
              <li onClick={handleSort} id="2">
                最喜歡
              </li>
              <li onClick={handleSort} id="3">
                最多留言
              </li>
            </ul>
          </div>
        </div>
      )}

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
                  {!data.author.photo && <img src={defaulephoto} alt="" />}
                  {data.author.photo && <img src={data.author.photo} alt="" />}
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
                  <p style={{ color: "rgb(62, 110, 255)" }}>
                    {data.reply.length}
                  </p>
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
