import React, { useState, useRef } from "react";
import UserPostService from "../services/userpost.service";
import AuthService from "../services/auth.service";
import DefaultPhoto from "../image/user_photo/userdef.svg";

const ReplyComponent = ({ _id, setNewReply }) => {
  let [reply, setReply] = useState([]); //留言內容

  const handlecontent = (e) => {
    // 留言handle
    setReply(e.target.innerText);
  };

  //送出貼文後文字清空
  const contentEditableRef = useRef(null);

  const handleSubmit = () => {
    //送出留言
    UserPostService.postReply(_id, reply)
      .then((data) => {
        contentEditableRef.current.innerHTML = "";
        setReply("");
        setNewReply(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="reply_main replyPost_main">
        <div className="reply_left">
          {AuthService.getCurrentUser() && (
            <img src={AuthService.getCurrentUser().user.photo} alt="" />
          )}
          {!AuthService.getCurrentUser() && <img src={DefaultPhoto} alt="" />}
        </div>
        <div className="reply_right">
          {AuthService.getCurrentUser() && (
            <div
              onInput={handlecontent}
              contentEditable="true"
              className="reply_content"
              ref={contentEditableRef}
            ></div>
          )}
          {!AuthService.getCurrentUser() && (
            <div
              style={{ color: "grey" }}
              onInput={handlecontent}
              className="reply_content"
              ref={contentEditableRef}
            >
              請先登入帳號才能留言
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className={`newRplybtn ${reply.length > 0 ? "buttom_change" : ""}`}
        >
          送出
        </button>
      </div>
    </div>
  );
};

export default ReplyComponent;
