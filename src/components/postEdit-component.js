import React, { useEffect, useRef, useState } from "react";
import circle from "../image/message/circle.svg";
import UserPostService from "../services/userpost.service";
import uploadImage from "../image/message/image.svg";

const PostEditComponent = ({
  openModal,
  setOpenModal,
  editData,
  setEditData,
}) => {
  let [postContent, setPostContent] = useState("");

  let [updateImage, setUpdateImage] = useState(true); //原本data的圖片 是否有編輯刪掉

  let [editImage, setEditImage] = useState("");
  //取的上傳圖片後 input 的值
  const handleChangeImage = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setEditImage(reader.result);
    };
  };

  const inputRef = useRef(null);
  const handleClickImage = () => {
    inputRef.current.click();
  };

  //取消原本的圖片
  const handleCircleImage = (e) => {
    e.target.parentElement.children[1].remove();
    setUpdateImage(false);
  };

  //取的貼文文字
  const handleContent = (e) => {
    setPostContent(e.target.innerText);
  };

  //送出資料
  const handleSubmit = () => {
    setPostContent(editData.content);

    if (postContent == "") return; //貼文沒有內容就不送出
    let _id = editData._id;
    if (updateImage == false && editImage == "") {
      //(取消原本貼文圖片);
      UserPostService.editePostDelImg(_id, postContent)
        .then((d) => {
          setEditData(d.data);
          setOpenModal(false);
          setUpdateImage(true);
          setEditImage("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (editImage == "") {
      //(僅更改內容);
      UserPostService.editPost(_id, postContent)
        .then((d) => {
          setEditData(d.data);
          setOpenModal(false);
          setUpdateImage(true);
          setEditImage("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //(新增圖片);
      UserPostService.editPostChangeImage(editImage, postContent, _id)
        .then((d) => {
          setEditData(d.data);
          setOpenModal(false);
          setUpdateImage(true);
          setEditImage("");
        })
        .catch((err) => {
          window.alert("失敗\n請使用較小的圖片");
        });
    }
  };

  if (!openModal) return null;

  return (
    <div
      onClick={() => {
        setOpenModal(false);
        setUpdateImage(true);
        setEditImage("");
      }}
      className="overlay"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <h3>編輯貼文</h3>
        {editData && (
          <div
            onInput={handleContent}
            className="modalTextContent"
            suppressContentEditableWarning="true"
            contentEditable="true"
          >
            {editData.content}
          </div>
        )}
        {editData.image && editImage == "" && (
          <div className="modalimage_div">
            <img
              id={editData.image}
              onClick={handleCircleImage}
              className="circle_image"
              src={circle}
              alt=""
            />
            <img className="post_image" src={editData.image} alt="" />
          </div>
        )}
        {editImage && (
          <div className="modalimage_div">
            <img
              //按下圖片右上方的X
              onClick={() => {
                setEditImage("");
                setUpdateImage(true);
              }}
              className="circle_image"
              src={circle}
              alt=""
            />
            <img className="post_image" src={editImage} alt="" />
          </div>
        )}
        <div className="edit_uploadImage">
          <input
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleChangeImage}
            type="file"
          />
          <img onClick={handleClickImage} src={uploadImage} alt="" />
        </div>
        <p
          onClick={() => {
            setOpenModal(false);
            setUpdateImage(true);
            setEditImage("");
          }}
          className="closure"
        >
          X
        </p>
        <button onClick={handleSubmit}>更新</button>
      </div>
    </div>
  );
};

export default PostEditComponent;
