import React, { useRef, useState } from "react";
import UserPostService from "../services/userpost.service";
import AuthService from "../services/auth.service";
import imageIcon from "../image/message/image.svg";
import circle from "../image/message/circle.svg";

import defaultImg from "../image/user_photo/IMG_3644.png";

const PostnewComponent = ({ result, setResult }) => {
  //連結input file
  const inputRef = useRef(null);
  const handleClickImage = (e) => {
    inputRef.current.click();
  };

  //送出貼文後文字清空
  const contentEditableRef = useRef(null);

  //取的上傳圖片後資訊
  let [image, setImage] = useState("");
  const handleChangeImage = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  //取得輸入的文字
  let [newPost, setNewPost] = useState("");
  const handleContent = (e) => {
    setNewPost(e.target.innerText);
  };

  //刪除上傳圖片
  const handleCircle = () => {
    setImage("");
  };

  //傳送資料
  const handleSubmit = () => {
    if (newPost.length == 0) return; //如果沒有文字就不送出
    if (!image) {
      //新貼文沒有圖片就用 newPost()
      UserPostService.newPost(newPost)
        .then(() => {
          setResult(true);
          setNewPost(""); //送出後清空文字
          contentEditableRef.current.innerHTML = "";
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //新貼文有圖片就用 newPostAndImgae()
      // console.log(image); 圖片 base64
      // console.log(newPost);  貼文文字
      UserPostService.newPostAndImgae(newPost, image)
        .then(() => {
          setResult(true);
          setNewPost(""); //送出後清空文字
          contentEditableRef.current.innerHTML = "";
          setImage(""); //送出後清空圖片
        })
        .catch((err) => {
          window.alert("失敗\n請使用較小的圖片");
        });
    }
  };

  return (
    <div>
      {/* 新貼文發布的頭像資訊
      {AuthService.getCurrentUser() && (
        <div className="postnew_main">
          <div className="postnew_img">
            <img src={defaultImg} alt="" />
          </div>
          <h2>dmin</h2>
        </div>
      )} */}

      {!AuthService.getCurrentUser() && (
        <div
          onInput={handleContent}
          className="con"
          ref={contentEditableRef}
          style={{ color: "gray" }}
        >
          請先登入帳號才能發文
        </div>
      )}
      {AuthService.getCurrentUser() && (
        <div
          onInput={handleContent}
          className="con"
          contentEditable="true"
          ref={contentEditableRef}
        ></div>
      )}

      {image && (
        <div className="showimage">
          <div onClick={handleCircle} className="circle_svg">
            <img src={circle} alt="" />
          </div>
          <img src={image} alt=""></img>
        </div>
      )}
      <br />
      <div className="newpost_bottom">
        {AuthService.getCurrentUser() && (
          <div className="post_image_icon">
            <img onClick={handleClickImage} src={imageIcon} alt="" />
            <input
              style={{ display: "none" }}
              type="file"
              ref={inputRef}
              onChange={handleChangeImage}
              accept="image/*"
            />
          </div>
        )}

        <div className="new_post_button">
          <button
            onClick={handleSubmit}
            className={newPost.length > 0 ? "buttom_change" : ""}
          >
            發布
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PostnewComponent;
