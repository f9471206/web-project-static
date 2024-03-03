import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class MemberService {
  login(user, pwd) {
    return axios.post(API_URL + "/login", {
      email: user,
      password: pwd,
    });
  }

  register({ email, username, password }) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }

  //個人資料
  userProfile(_id) {
    return axios.get(API_URL + "/" + _id);
  }
  //個人發文資料
  userProfileTweet(_id, count = 0) {
    return axios.get(`${API_URL}/tweet/${_id}?count=${count}`);
  }
  //個人留言資料
  userProfileTweetReplys(_id) {
    return axios.get(API_URL + "/tweet-replys/" + _id);
  }

  //帳號資料編輯
  userProfileEdit(data) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(`${API_URL}/profile/edit`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
  }

  //修改背景圖
  userProfileBg(data) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(`${API_URL}/profile/edit-bg`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
  }
}

const memberService = new MemberService();
export default memberService;
