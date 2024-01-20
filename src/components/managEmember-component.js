import React, { useEffect, useState } from "react";
import UserProfile from "../services/userprofile.service";
import defaulephoto from "../image/user_photo/userdef.svg";
import HomeLoadingConponent from "./homeLoading-conponent";
import { useNavigate } from "react-router-dom";

const ManagEmemberComponent = () => {
  //
  const [check, setCheck] = useState(false);
  const [data, setData] = useState("");

  //點下會員，匯入資料到div
  const [userContent, setContent] = useState(false); //顯示列表
  const [chooseUser, setChooseUser] = useState(""); //選擇後的用戶

  //回傳會員資料
  const [userData, setUserData] = useState("");
  const handleContent = (e) => {
    setUserData("");
    setChooseUser("");
    if (userContent) {
      setContent(false);
      return;
    }
    setContent(true);
    setChooseUser(data.find((item) => item._id == e.currentTarget.id));
    UserProfile.getManageMemberContent(e.currentTarget.id)
      .then((d) => {
        setUserData(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //選擇其中一篇貼文
  const navigate = useNavigate();
  const handleOnePost = (e) => {
    // HomeService.getOnePost(e.currentTarget.id);
    navigate("/home/" + e.currentTarget.id);
  };

  useEffect(() => {
    UserProfile.getManageMember()
      .then((d) => {
        setCheck(true);
        setData(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {!check && <HomeLoadingConponent />}
      {check && (
        <div
          onClick={() => {
            setContent(false);
          }}
          className="manag-emember container py-4 home_main"
        >
          <h2>全部會員</h2>
          <table
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="table table_m table-secondary"
          >
            <thead>
              <tr className="table_m_tr">
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col">名稱</th>
                <th scope="col">信箱</th>
                <th scope="col">權限</th>
                <th scope="col">加入日期</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((d, index) => {
                  return (
                    <tr
                      className="table_m_tr"
                      key={d._id}
                      onClick={handleContent}
                      id={d._id}
                    >
                      <td scope="row">{index + 1}</td>
                      <td>
                        <div className="photo">
                          {d.photo != null && <img src={d.photo} />}
                          {d.photo == null && <img src={defaulephoto} />}
                        </div>
                      </td>
                      <td>{d.username}</td>
                      <td>{d.email}</td>
                      <td>{d.role}</td>
                      <td>{new Date(d.date).toLocaleString()}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {userContent && (
            // 會員詳細資料
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="userContent"
            >
              <div
                onClick={() => {
                  setContent(false);
                }}
                className="close"
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
              <div className="title">
                {/* 大頭貼 */}
                <div className="img">
                  <img
                    src={chooseUser.photo ? chooseUser.photo : defaulephoto}
                  />
                </div>
                <div className="name">
                  <p>{chooseUser.username}</p>
                </div>
                <div className="email">
                  <p>{chooseUser.email}</p>
                </div>
                <div className="role">
                  <p>{chooseUser.role}</p>
                </div>
                <div className="date">
                  <p>{new Date(chooseUser.date).toLocaleString()}</p>
                </div>
              </div>
              {userData && userData == "" && (
                <div className="no-post-data">
                  <p>用戶尚未發文</p>
                </div>
              )}
              {userData && userData != "" && (
                <div className="postContent">
                  <div className="number">
                    <p>#</p>
                  </div>
                  <div className="postContent">
                    <p>文章內容</p>
                  </div>
                  <div className="postDate">
                    <p>文章日期</p>
                  </div>
                  <div className="post_replys">
                    <p>留言數</p>
                  </div>
                  <div className="post_likes">
                    <p>喜歡數 </p>
                  </div>
                </div>
              )}
              {!userData && (
                <button className="button_cursor_none">
                  <span className="preloader">
                    <div className="circ1"></div>
                    <div className="circ2"></div>
                    <div className="circ3"></div>
                    <div className="circ4"></div>
                  </span>
                </button>
              )}
              {userData &&
                userData != "" &&
                userData.map((d, index) => {
                  return (
                    <div
                      onClick={handleOnePost}
                      key={d._id}
                      id={d._id}
                      className="postContent active"
                    >
                      <div className="number">
                        <p>{index + 1}</p>
                      </div>
                      <div className="postContent">
                        <p>{d.content}</p>
                      </div>
                      <div className="postDate">
                        <p>{new Date(d.date).toLocaleString()}</p>
                      </div>

                      <div className="post_replys">
                        <p>{d.reply.length}</p>
                      </div>
                      <div className="post_likes">
                        <p>{d.like.length}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ManagEmemberComponent;
