import React from "react";
import p1 from "../image/post_content/p1.jpg";
import p2 from "../image/post_content/p2.jpg";
import p3 from "../image/post_content/p3.jpg";
import p4 from "../image/post_content/p4.jpg";
import p5 from "../image/post_content/p5.jpg";
import { useNavigate } from "react-router-dom";

const WelcomepageComponent = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">社群系統</h1>
            <p className="col-md-8 fs-4">
              本系統使用 React.js 作為前端框架，Node.js、MongoDB
              作為後端服務器。
            </p>
            <ul style={{ fontSize: "1.5rem" }}>
              <li>新增、編輯、刪除會員帳號</li>
              <li>新增、編輯、刪除貼文留言</li>
              <li>LIKE貼文或留言</li>
            </ul>
            <h3 className="fw-bold">
              大頭貼、貼文可以使用圖片，若需要這裡有提供圖片(上傳的圖片不能太大)
            </h3>
            <div className="welcomeimage">
              <img src={p1} className="img-thumbnail" alt="" />
              <img src={p2} className="img-thumbnail" alt="" />
              <img src={p3} className="img-thumbnail" alt="" />
              <img src={p4} className="img-thumbnail" alt="" />
              <img src={p5} className="img-thumbnail" alt="" />
            </div>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>看看貼文</h2>
              <p>看其他人所發布的貼文或是留言</p>
              <button
                onClick={() => {
                  navigate("/home");
                }}
                className="btn btn-outline-light"
                type="button"
              >
                去看看
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>加入會員</h2>
              <p>會員可以發布新貼文、留言、喜歡貼文或留言</p>
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="btn btn-outline-secondary"
                type="button"
              >
                登錄會員、或者註冊一個帳號
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </main>
  );
};

export default WelcomepageComponent;
