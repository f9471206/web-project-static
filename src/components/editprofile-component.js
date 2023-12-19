import React, { useRef, useState, useEffect } from "react";
import UserProfile from "../services/userprofile.service";
import { useNavigate, useParams } from "react-router-dom";
import HomeLoadingConponent from "./homeLoading-conponent";

const EditprofileComponent = () => {
  const navigate = useNavigate();

  const { _id } = useParams();

  const inputRef = useRef(null);

  let [image, setImage] = useState(""); //上傳圖片

  let [userData, setUserData] = useState(""); //資料庫拿的資料

  let [inputUsername, setInputUsername] = useState(""); //inputUsername

  let [subLoading, setSubLoading] = useState(false);

  const handleButtonClick = () => {
    inputRef.current.click(); //button 連結 input type="file"
  };

  //input 暱稱的資料
  const handleUsername = (e) => {
    setInputUsername(e.target.value);
  };

  //取得選擇圖片後的資料
  const handleImageChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  //送出編輯後的資料
  const handleSumbit = () => {
    if (subLoading) return;
    setSubLoading(true);

    if (image == "" && inputUsername == "") {
      //如果都沒編輯案送出 直接導回個人頁面
      return navigate("/profile/" + _id);
    }
    if (image == "") {
      //只有改暱稱 沒有改大頭貼
      // console.log(inputUsername);
      UserProfile.editProfile(inputUsername, _id)
        .then((data) => {
          navigate("/profile/" + _id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (image != "") {
      // console.log(_id); //使用者ID
      // console.log(image); //變更後得圖片 base64
      // console.log(inputUsername); //使用者的暱稱
      UserProfile.editProfileAndPhoto(_id, inputUsername, image)
        .then((d) => {
          if (d.data.message == "success") {
            let obj = JSON.parse(localStorage.getItem("user"));
            obj.user.photo = image;
            localStorage.setItem("user", JSON.stringify(obj));
            window.alert("編輯成功");
            navigate("/profile/" + _id);
          }
        })
        .catch((err) => {
          setSubLoading(false);
          window.alert("失敗\n請使用較小的圖片");
        });
    }
  };

  useEffect(() => {
    //進入網頁取的個人資料
    UserProfile.getProfile(_id)
      .then((data) => {
        setUserData(data.data);
        setInputUsername(data.data[0].username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!userData) return <HomeLoadingConponent />;
  return (
    <div className="container py-4">
      {userData &&
        userData.map((data) => {
          return (
            <div key={data._id}>
              <div className="username_div">
                <h2>暱稱</h2>
                <input
                  onChange={handleUsername}
                  type="text"
                  defaultValue={data.username}
                />
              </div>
              <div className="userphoto_div">
                <h2>大頭照</h2>
                <div className="uploadimg">
                  {image == "" || image == null ? (
                    <img src={data.photo} alt="" />
                  ) : (
                    <img src={image} />
                  )}
                </div>
              </div>
              <div className="button_div">
                <button onClick={handleButtonClick}>選擇圖片</button>
                <input
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                />
              </div>
              <div className="sudmit_div">
                <button onClick={handleSumbit}>
                  修改資料
                  {subLoading && (
                    <span className="preloader">
                      <div className="circ1"></div>
                      <div className="circ2"></div>
                      <div className="circ3"></div>
                      <div className="circ4"></div>
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default EditprofileComponent;
