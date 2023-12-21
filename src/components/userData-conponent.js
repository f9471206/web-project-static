import React, { useEffect, useState } from "react";
import HomeService from "../services/home.service";
import HomeLoadingConponent from "./homeLoading-conponent";

export default function UserDataConponent({ _id }) {
  //文章總數
  const [posts, setPosts] = useState();

  //Like 總數
  const [likes, setLikes] = useState();

  const [show, setShow] = useState(false);

  useEffect(() => {
    HomeService.getUserData(_id)
      .then((d) => {
        let total = d.data.reduce(
          (sum, obj) => sum + (obj.like ? obj.like.length : 0),
          0
        );
        setLikes(total);
        setPosts(d.data.length);
        setShow(true);
      })
      .catch((e) => {
        console.log("錯誤");
      });
  }, []);

  return (
    <>
      {show ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="userDataCon"
        >
          <span>{posts} 文章</span> / <span>{likes} 喜歡</span>
          <div className="arrowBottom"></div>
        </div>
      ) : (
        <div className="userDataCon">
          <div className="user_loading">
            <p>Loading</p>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="arrowBottom"></div>
        </div>
      )}
    </>
  );
}
