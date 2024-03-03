import axios from "axios";
const API_URL = "http://localhost:8080/api/post/";

class TweetService {
  //新貼文
  postTweet(data) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(API_URL + "/tweet-post", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
  }

  //編輯文章
  editPost(_id, data) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(API_URL + "/tweet-edit/" + _id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
  }

  //刪除文章
  deleteTweet(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/tweet-delete/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  //送出留言
  replyTweet(data, id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(API_URL + "tweet-reply/" + id, data, {
      headers: {
        Authorization: token,
      },
    });
  }

  //編輯留言
  replyEdit(data, post_id, id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(`${API_URL}reply-edit/${post_id}/${id}`, data, {
      headers: {
        Authorization: token,
      },
    });
  }

  //刪除留言
  deleteReply(_id, reply_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(`${API_URL}deletereply/${_id}/${reply_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  //文章按讚
  tweetLike(_id, like) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    if (like) {
      like = "remove";
    } else {
      like = "add";
    }
    return axios.patch(
      `${API_URL}tweet-like/${_id}?action=${like}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //留言按讚
  replyLike(_id, _replyid, like) {
    let token;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    if (like) {
      like = "remove";
    } else {
      like = "add";
    }
    return axios.patch(
      `${API_URL}${_id}/replylike/${_replyid}?action=${like}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

const tweetService = new TweetService();
export default tweetService;
