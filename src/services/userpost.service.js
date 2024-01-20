import axios from "axios";

const API_URL = "http://localhost:8080/api/post/";
// const API_URL = "https://web-project-service.onrender.com/api/post/";

class UserPostService {
  //只有文字的貼文
  newPost(content) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { content: content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //文字家圖片的貼文
  newPostAndImgae(newPost, image) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "postimage",
      { content: newPost, image },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //喜歡文章
  likePost(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + _id + "/postlike/",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //文章 取消喜歡
  CancelLikePost(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + _id + "/postCancelLike/",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //送出留言
  postReply(_id, content) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + _id + "/reply",
      { content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //編輯留言
  editReply(post_id, Reply_id, content) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "editreply/" + post_id,
      {
        Reply_id,
        content,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //刪除留言
  deleteReply(_id, _replyid) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "deletereply/" + _id + "/" + _replyid, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 喜歡留言
  likeReply(_id, _Replyid) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + _id + "/replylike/" + _Replyid,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //留言 取消喜歡
  CancelLikeReply(_id, _Replyid) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + _id + "/replyCancelLike/" + _Replyid,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //編輯貼文 (取消原本圖片)
  editePostDelImg(_id, content) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "editepostdelimg/" + _id,
      { content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //貼文僅更改貼文內容
  editPost(_id, content) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "editepost/" + _id,
      { content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //貼文新增或更改圖片
  editPostChangeImage(image, content, _id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "editpostchangeimage",
      { image, content, _id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //刪除貼文
  delePost(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

const userPostService = new UserPostService();
export default userPostService;
