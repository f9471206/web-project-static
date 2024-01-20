import axios from "axios";
// const API_URL = "http://localhost:8080/api/user/profile/";
const API_URL = "https://web-project-service.onrender.com/api/user/profile/";

class UserProfile {
  //取得個人資料
  getProfile(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  //編輯個人資料(只有改名稱)
  editProfile(username, _id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "edit/" + _id,
      { username: username },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //編輯個人資料(名稱或圖片)
  editProfileAndPhoto(_id, inputUsername, image) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "editAll/" + _id,
      { username: inputUsername, photo: image },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //刪除個人資料
  deleteUser(password) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "deleteuser/",
      { password },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //管理員觀看會員
  getManageMember() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "emember",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //管理員觀看會員詳細資料
  getManageMemberContent(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "manag-emember/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

const userProfile = new UserProfile();
export default userProfile;
