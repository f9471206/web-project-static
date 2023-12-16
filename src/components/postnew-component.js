import React, { useRef, useState } from "react";
import UserPostService from "../services/userpost.service";
import AuthService from "../services/auth.service";
import imageIcon from "../image/message/image.svg";
import circle from "../image/message/circle.svg";

const PostnewComponent = ({ result, setResult }) => {
  //送出後的Loading
  let [newPostLoading, setNewPostLoading] = useState(false);

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
    if (newPostLoading) return;
    if (newPost.length == 0) return; //如果沒有文字就不送出
    setNewPostLoading(true);
    if (!image) {
      //新貼文沒有圖片就用 newPost()
      UserPostService.newPost(newPost)
        .then(() => {
          setResult(true);
          setNewPostLoading(false);
          setNewPost(""); //送出後清空文字
          contentEditableRef.current.innerHTML = "";
        })
        .catch((err) => {
          console.log(err);
          setNewPostLoading(false);
        });
    } else {
      //新貼文有圖片就用 newPostAndImgae()
      // console.log(image); 圖片 base64
      // console.log(newPost);  貼文文字
      UserPostService.newPostAndImgae(newPost, image)
        .then(() => {
          setResult(true);
          setNewPostLoading(false);
          setNewPost(""); //送出後清空文字
          contentEditableRef.current.innerHTML = "";
          setImage(""); //送出後清空圖片
        })
        .catch((err) => {
          setNewPostLoading(false);
          window.alert("失敗\n請使用較小的圖片");
        });
    }
  };

  return (
    <div className="postNew-bg">
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
          {!newPostLoading ? (
            <button
              onClick={handleSubmit}
              className={newPost.length > 0 ? "buttom_change" : ""}
            >
              發布
            </button>
          ) : (
            <button>
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
  );
};

export default PostnewComponent;
