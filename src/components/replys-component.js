import React, { useEffect, useState } from "react";
import UserPostService from "../services/userpost.service";
import HomeService from "../services/home.service";
import AuthService from "../services/auth.service";
import Calculate from "./showtime";
import defaulephoto from "../image/user_photo/userdef.svg";
import message from "../image/message/comment.svg";
import { useParams } from "react-router-dom";
import HomeLoadingConponent from "./homeLoading-conponent";
import UserDataConponent from "./userData-conponent";

const ReplysComponent = ({ newReply }) => {
  let [sort_ID, setSortID] = useState("");
  let [replysSort, setReplysSort] = useState(false); //開關留言排序的選單
  let [timeDelay, setTimeDelay] = useState(false);
  const handleSort = (e) => {
    setSortID(e.target.id);
    setTimeDelay(true);
    setReplysSort(false);
    document.getElementById("myIcon").style.transform = "rotate(0deg)";
    setTimeout(() => {
      setTimeDelay(false);
    }, 500);
  };

  let [userId, serUserId] = useState(""); //確認 like array 是否有按過了

  let [postData, setPostData] = useState("");

  //最新留言
  if (postData.reply && sort_ID == 1) {
    postData.reply.sort((b, a) => {
      return new Date(a.date) - new Date(b.date);
    });
  }
  //最早留言
  if (postData.reply && sort_ID == 0) {
    postData.reply.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  //熱門留言
  if (postData.reply && sort_ID == 2) {
    postData.reply.sort((b, a) => {
      return a.like.length - b.like.length;
    });
  }

  let { _id } = useParams(); //網址上 post ID

  let [replyEdit, setReplyEdit] = useState(false); //開啟留言的編輯或刪除

  //Loading
  let [loadingBtn, setLoadingBtn] = useState(false);

  const handleLike = (e) => {
    if (!userId) return window.alert("請先登入");
    let Replyid = e.currentTarget.id;
    let classList = e.currentTarget;
    if (!e.currentTarget.classList.contains("clickLike")) {
      // 還沒按過喜歡
      classList.classList.add("clickLike");
      classList.classList.remove("unclickLike");
      //增加LIKE 數字
      let addNumber = Number(classList.children[1].innerText) + 1;
      classList.children[1].innerText = addNumber;

      UserPostService.likeReply(postData._id, Replyid)
        .then((d) => {
          setPostData(d.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //按過喜歡後要回收喜歡
      classList.classList.remove("clickLike");
      classList.classList.add("unclickLike");
      //減少LIKE 數字
      let addNumber = Number(classList.children[1].innerText) - 1;
      classList.children[1].innerText = addNumber;

      UserPostService.CancelLikeReply(postData._id, Replyid)
        .then((d) => {
          setPostData(d.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //按下編輯點點
  let [chackReplyID, setChackReplyID] = useState("");
  const handleChackReplyID = (e) => {
    if (replyEdit == true) return setReplyEdit(false); //關閉點點的延伸
    if (deleteChack == true) return setDeleteChack(false); //關閉刪除
    if (replyEditClick == true)
      return (
        setReplyEditClick(false), setReplyContentID(""), setReplyEdit(false)
      );
    setChackReplyID(e.currentTarget.id);
    setReplyEdit(true);
  };

  //按下編輯留言
  let [replyEditClick, setReplyEditClick] = useState(false); //開起留言編輯
  let [replyContentID, setReplyContentID] = useState(""); //該留言的ID
  const handleReplybtn = (e) => {
    // if (replyEditClick == true)
    //   return (
    //     setReplyEditClick(false), setReplyContentID(""), setReplyEdit(false)
    //   );
    setReplyEdit(false);
    setReplyEditClick(true);
    setReplyContentID(e.currentTarget.id);
  };

  //取得編輯後的值
  let [editReply, setEditReply] = useState("");
  const handleChangeReplyEdit = (e) => {
    setEditReply(e.target.innerText);
  };

  //確認編輯後送出
  const handleEditReplySubmit = () => {
    if (!editReply) return;
    if (loadingBtn) return;
    setLoadingBtn(true);
    UserPostService.editReply(_id, replyContentID, editReply)
      .then((d) => {
        setPostData(d.data);
        setReplyEditClick(false); //關閉輸入欄
        setReplyContentID("");
        setLoadingBtn(false);
        setEditReply("");
      })
      .catch((err) => {
        console.log(err);
        setLoadingBtn(false);
      });
  };

  //刪除貼文
  let [deleteChack, setDeleteChack] = useState(false);
  let [deleteID, setDeleteID] = useState("");
  const handleDeleteChack = (e) => {
    //顯示提醒是否要刪除
    setReplyEdit(false); //點點關閉
    setDeleteID(e.currentTarget.id);
    setDeleteChack(true);
    setReplyEdit(false); //點點關閉
  };
  //送出刪除
  const handleDelteSumbit = () => {
    if (loadingBtn) return;
    setLoadingBtn(true);
    UserPostService.deleteReply(_id, chackReplyID)
      .then((d) => {
        setPostData(d.data);
        setDeleteChack(false);
        setLoadingBtn(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingBtn(false);
      });
  };

  //userData Event
  const [userData, setUserData] = useState(false);
  const [user_ID, setUser_ID] = useState("");
  const [checkUser_ID, setCheckUser_ID] = useState("");
  const handleUserData = (e) => {
    setCheckUser_ID(e.target.closest(".reply_main").id);
    setUser_ID(e.target.parentElement.id);
    if (userData) {
      setUserData(false);
      return;
    }
    setUserData(true);
  };

  useEffect(() => {
    HomeService.getOnePost(_id)
      .then((data) => {
        setPostData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (AuthService.getCurrentUser()) {
      serUserId(AuthService.getCurrentUser().user._id);
    }
  }, [newReply]);

  // if (!postData || timeDelay) return <HomeLoadingConponent />;

  return (
    <div>
      {postData.reply == "" && (
        <div
          style={{
            padding: "5rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "200px",
              padding: "0.25rem 1rem",
            }}
          >
            <img style={{ opacity: "0.2" }} src={message} alt="" />
          </div>
          <h4 style={{ textAlign: "center", color: "grey" }}>暫時還沒有留言</h4>
        </div>
      )}
      {postData && postData.reply != "" && (
        <div style={{ position: "relative", padding: "0.5rem 0.25rem" }}>
          <div
            onClick={() => {
              if (replysSort) {
                document.getElementById("myIcon").style.transform =
                  "rotate(0deg)";
                setReplysSort(false);
              } else {
                document.getElementById("myIcon").style.transform =
                  "rotate(180deg)";
                setReplysSort(true);
              }
            }}
            className="my-select__container"
            style={{
              paddingRight: "0.25rem",
              display: "flex",
              alignItems: "center",
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                padding: " 0 0.25rem",
                userSelect: "none",
              }}
            >
              {!sort_ID && "最早"}
              {sort_ID && sort_ID == 0 && "最早"}
              {sort_ID && sort_ID == 1 && "最新"}
              {sort_ID && sort_ID == 2 && "熱門"}
            </span>
            <i
              id="myIcon"
              style={{ paddingBottom: "12px", fontSize: "1.5rem" }}
              className="fa-solid fa-sort-down myIcon"
            ></i>
            <div
              style={{
                position: "absolute",
                top: "110%",
                backgroundColor: "red",
                zIndex: "10",
              }}
            ></div>
          </div>
          {replysSort && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                zIndex: "10",
                borderRadius: "10px",
              }}
            >
              <ul className="mhy-select__container_li">
                <li onClick={handleSort} id="0">
                  最早
                </li>
                <li onClick={handleSort} id="1">
                  最新
                </li>
                <li onClick={handleSort} id="2">
                  熱門
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {timeDelay && <HomeLoadingConponent />}
      {!postData && <HomeLoadingConponent />}
      {postData &&
        postData.reply.map((data) => {
          if (!data.user)
            return (
              <div key={data._id} className="reply_main">
                <div className="reply_left">
                  <div className="reply_photo">
                    <img src={defaulephoto} alt="" />
                  </div>
                </div>
                <div className="replys_rigth">
                  <h2>已經刪除帳號</h2>
                  <p>{Calculate.calculateTime(data.date)}</p>
                  {replyContentID != data._id && (
                    <p
                      className={
                        deleteChack && data._id == deleteID
                          ? "replys_p delete_reply_text"
                          : "replys_p"
                      }
                    >
                      {data.content}
                    </p>
                  )}
                  <div className="replys_like">
                    {data.like.includes(userId) && (
                      <div
                        id={data._id}
                        onClick={handleLike}
                        className="clickLike"
                      >
                        <i className="fa-regular fa-heart"></i>
                        <p>{data.like.length}</p>
                      </div>
                    )}
                    {!data.like.includes(userId) && (
                      <div
                        id={data._id}
                        onClick={handleLike}
                        className="unclickLike"
                      >
                        <i className="fa-regular fa-heart"></i>
                        <p>{data.like.length}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          return (
            <div id={data._id} key={data._id} className="reply_main">
              <div className="reply_left">
                <div
                  id={data.user._id}
                  onClick={handleUserData}
                  className="reply_photo"
                >
                  {!data.user.photo && <img src={defaulephoto} alt="" />}
                  {data.user.photo && <img src={data.user.photo} alt="" />}
                  {userData && data._id == checkUser_ID && (
                    <UserDataConponent _id={user_ID} />
                  )}
                </div>
              </div>
              <div className="replys_rigth">
                <h2>{data.user.username}</h2>
                <p style={{ marginBottom: "0" }}>
                  {Calculate.calculateTime(data.date)}
                </p>
                {replyContentID != data._id && (
                  // <p className="replys_p">{data.content}</p>
                  <p
                    className={
                      deleteChack && data._id == deleteID
                        ? "replys_p delete_reply_text"
                        : "replys_p"
                    }
                  >
                    {data.content}
                  </p>
                )}
                {/* 編輯彈出 */}
                {replyEditClick && data._id == replyContentID && (
                  <>
                    <div
                      onInput={handleChangeReplyEdit}
                      suppressContentEditableWarning="true"
                      className="reply_edit_text"
                      contentEditable="true"
                    >
                      {data.content}
                    </div>
                    <div className="modal-footer">
                      {!loadingBtn && editReply && (
                        <>
                          <button
                            onClick={() => {
                              setReplyEditClick(false);
                              setReplyContentID("");
                              setEditReply("");
                            }}
                            type="button"
                            className="btn btn-secondary m-1"
                          >
                            返回
                          </button>
                          <button
                            onClick={handleEditReplySubmit}
                            type="button"
                            className="btn btn-primary m-1"
                          >
                            確定編輯
                          </button>
                        </>
                      )}
                      {loadingBtn && (
                        <button
                          style={{ cursor: "default" }}
                          className="replysDeleteLoading"
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
                  </>
                )}

                {/* 刪除彈出的提醒 */}
                {deleteChack && deleteID == data._id && (
                  <div className="modal-footer">
                    {!loadingBtn ? (
                      <>
                        <button
                          onClick={() => {
                            setDeleteChack(false);
                          }}
                          type="button"
                          className="btn btn-secondary m-1"
                        >
                          返回
                        </button>
                        <button
                          onClick={handleDelteSumbit}
                          type="button"
                          className="btn btn-danger m-1"
                        >
                          確定刪除
                        </button>
                      </>
                    ) : (
                      <button
                        style={{ cursor: "default" }}
                        className="replysDeleteLoading"
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
                )}

                <div className="replys_like">
                  {data.like.includes(userId) && (
                    <div
                      id={data._id}
                      onClick={handleLike}
                      className="clickLike"
                    >
                      <i className="fa-regular fa-heart"></i>
                      <p>{data.like.length}</p>
                    </div>
                  )}
                  {!data.like.includes(userId) && (
                    <div
                      id={data._id}
                      onClick={handleLike}
                      className="unclickLike"
                    >
                      <i className="fa-regular fa-heart"></i>
                      <p>{data.like.length}</p>
                    </div>
                  )}
                </div>
              </div>
              {userId && userId == data.user._id && (
                <>
                  <div className="one_post_edit">
                    <div id={data._id} onClick={handleChackReplyID}>
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                  </div>
                  {replyEdit && data._id == chackReplyID && (
                    <div className="edit_div">
                      <div id={data._id} onClick={handleReplybtn}>
                        編輯留言
                      </div>
                      <div id={data._id} onClick={handleDeleteChack}>
                        刪除留言
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ReplysComponent;
